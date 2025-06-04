"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/providers";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { IHeader } from "@/types/IGlobal";
import { getStrapiMedia } from "@/utils/helpers";

interface IHeaderProps {
	data: IHeader;
}
export default function Header({ data }: IHeaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const { language, setLanguage } = useLanguage();
	const { logo, navItems, title, subtitle, contactLabel, contactPath } = data;
	const isHomePage = pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-5"
			}`}
		>
			<div className="container-custom flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-2">
					<div className="relative w-12 h-12">
						<div className="absolute inset-0 flex items-center justify-center">
							<Image
								src={getStrapiMedia(
									logo?.data?.attributes?.formats?.thumbnail?.url
								)}
								alt="logo"
								width={48}
								height={48}
							/>
						</div>
					</div>
					<div>
						<span className="block text-xl font-bold text-primary-700 leading-tight">
							{title}
						</span>
						<span className="block text-xs text-primary-600 uppercase tracking-wider">
							{subtitle}
						</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex space-x-8">
					{navItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={`nav-link ${
								pathname === item.path
									? scrolled || !isHomePage
										? "text-primary-700 font-semibold"
										: "text-white font-semibold"
									: scrolled || !isHomePage
									? "text-neutral-600"
									: "text-white"
							}`}
						>
							{language === "vi" ? item.name : item.nameEn}
						</Link>
					))}
				</nav>

				<div className="hidden md:flex items-center space-x-4"></div>

				{/* Mobile Navigation Toggle */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`md:hidden transition-colors ${
						scrolled || !isHomePage ? "text-neutral-700" : "text-white"
					}`}
				>
					{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
				</button>
			</div>

			{/* Mobile Navigation Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-white shadow-lg overflow-hidden"
					>
						<div className="container-custom py-4">
							<nav className="flex flex-col space-y-3">
								{navItems.map((item) => (
									<Link
										key={item.path}
										href={item.path}
										className={`py-2 px-4 rounded-lg transition-colors ${
											pathname === item.path
												? "bg-primary-50 text-primary-700 font-semibold"
												: "text-neutral-600 hover:bg-neutral-50"
										}`}
									>
										{language === "vi" ? item.name : item.nameEn}
									</Link>
								))}
							</nav>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
