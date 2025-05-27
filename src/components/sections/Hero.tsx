"use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Button from "@/components/ui/Button";
// import {
// 	FaPeopleCarry,
// 	FaHandHoldingHeart,
// 	FaCalendarAlt,
// } from "react-icons/fa";
import { IHeroSection } from "@/types/IHomePage";
// import { getStrapiMedia } from "@/utils/helpers";
// import { useEffect, useState } from "react";

// const iconMap: Record<string, JSX.Element> = {
// 	FaPeopleCarry: <FaPeopleCarry />,
// 	FaHandHoldingHeart: <FaHandHoldingHeart />,
// 	FaCalendarAlt: <FaCalendarAlt />,
// };

// export default function Hero(props: IHeroSection) {
// 	const { subtitle, title, description, backgroundImage, buttons } = props;
// const [htmlReady, setHtmlReady] = useState(false);

// useEffect(() => {
// 	setHtmlReady(true);
// }, []);

// 	const [ref, inView] = useInView({
// 		triggerOnce: true,
// 		threshold: 0.1,
// 	});

// 	const containerVariants = {
// 		hidden: { opacity: 0 },
// 		visible: {
// 			opacity: 1,
// 			transition: {
// 				staggerChildren: 0.2,
// 			},
// 		},
// 	};

// 	const itemVariants = {
// 		hidden: { opacity: 0, y: 30 },
// 		visible: {
// 			opacity: 1,
// 			y: 0,
// 			transition: {
// 				duration: 0.6,
// 				ease: [0.6, 0.05, 0.01, 0.9],
// 			},
// 		},
// 	};

// 	return (
// 		<div className="relative pt-20 bg-neutral-50">
// 			<div
// 				className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-primary-800/30"
// 				style={{ mixBlendMode: "multiply" }}
// 			/>

// 			<div className="absolute inset-0 overflow-hidden">
// 				<Image
// src={getStrapiMedia(
// 	backgroundImage?.data?.attributes?.formats?.medium?.url ||
// 		"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
// )}
// alt={backgroundImage?.data?.attributes?.alternativeText || title}
// 					fill
// 					priority
// 					style={{ objectFit: "cover", objectPosition: "center" }}
// 				/>
// 			</div>

// 			<div className="relative container-custom min-h-[80vh] flex flex-col justify-center py-20">
// 				<motion.div
// 					ref={ref}
// 					variants={containerVariants}
// 					initial="hidden"
// 					animate={inView ? "visible" : "hidden"}
// 					className="max-w-3xl text-white"
// 				>
// 					<motion.div
// 						variants={itemVariants}
// 						className="mb-4 inline-block px-4 py-1 bg-primary-700/80 rounded-full text-sm font-medium"
// 					>
// 						{subtitle}
// 					</motion.div>

// 					<motion.h1
// 						variants={itemVariants}
// 						className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
// 					>
// 						{title}
// 					</motion.h1>

// {htmlReady && description ? (
// 	<motion.p
// 		variants={itemVariants}
// 		className="text-xl mb-8 text-white/90 max-w-2xl"
// 		dangerouslySetInnerHTML={{ __html: description }}
// 	/>
// ) : null}

// 					<motion.div variants={itemVariants} className="flex flex-wrap gap-4">
// 						{buttons.map(({ id, text, link, icon, variant }) => {
// 							const clx =
// 								variant === "outline"
// 									? "bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
// 									: "shadow-lg";
// 							return (
// 								<Button
// 									key={id}
// 									variant={variant}
// 									size="lg"
// 									leftIcon={iconMap[icon] || null}
// 									className={clx}
// 								>
// 									<Link href={link || "/"}>{text}</Link>
// 								</Button>
// 							);
// 						})}
// 					</motion.div>
// 				</motion.div>
// 			</div>

// 			{/* Subtle wave decoration at bottom */}
// 			<div className="absolute bottom-0 left-0 right-0">
// 				<svg
// 					xmlns="http://www.w3.org/2000/svg"
// 					viewBox="0 0 1440 100"
// 					className="w-full"
// 				>
// 					<path
// 						fill="#FFFFFF"
// 						fillOpacity="1"
// 						d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
// 					></path>
// 				</svg>
// 			</div>
// 		</div>
// 	);
// }

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@/components/ui/Button";
import {
	FaPeopleCarry,
	FaHandHoldingHeart,
	FaCalendarAlt,
} from "react-icons/fa";
import { getStrapiMedia } from "@/utils/helpers";
import Description from "../ui/Description";

export default function Hero(props: IHeroSection) {
	const { subtitle, title, description, backgroundImage, buttons } = props;
	const [htmlReady, setHtmlReady] = useState(false);

	useEffect(() => {
		setHtmlReady(true);
	}, []);
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (delay: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: delay * 0.2,
				ease: [0.215, 0.61, 0.355, 1],
			},
		}),
	};

	return (
		<div className="relative pt-20 bg-neutral-50">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-primary-800/30"
				style={{ mixBlendMode: "multiply" }}
			/>

			<motion.div
				initial={{ opacity: 0, scale: 1.1 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
				className="absolute inset-0 overflow-hidden"
			>
				<Image
					src={getStrapiMedia(
						backgroundImage?.data?.attributes?.formats?.medium?.url ||
							"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
					)}
					alt={backgroundImage?.data?.attributes?.alternativeText || title}
					fill
					priority
					style={{ objectFit: "cover", objectPosition: "center" }}
				/>
			</motion.div>

			<div className="relative container-custom min-h-[80vh] flex flex-col justify-center py-20">
				<div ref={ref} className="max-w-3xl text-white">
					<motion.div
						custom={0}
						variants={fadeInUpVariants}
						initial="hidden"
						animate={inView ? "visible" : "hidden"}
						className="mb-4 inline-block px-4 py-1 bg-primary-700/80 rounded-full text-sm font-medium"
					>
						{subtitle}
					</motion.div>

					<motion.h1
						custom={1}
						variants={fadeInUpVariants}
						initial="hidden"
						animate={inView ? "visible" : "hidden"}
						className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
					>
						{title}
					</motion.h1>
					{htmlReady && description ? (
						<motion.p
							custom={2}
							variants={fadeInUpVariants}
							initial="hidden"
							animate={inView ? "visible" : "hidden"}
							className="text-xl mb-8 text-white/90 max-w-2xl"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					) : null}

					<motion.div
						custom={3}
						variants={fadeInUpVariants}
						initial="hidden"
						animate={inView ? "visible" : "hidden"}
						className="flex flex-wrap gap-4"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<Button
								variant="secondary"
								size="lg"
								leftIcon={<FaPeopleCarry />}
								className="shadow-lg"
							>
								<Link href="/volunteer">Đăng ký tình nguyện viên</Link>
							</Button>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<Button
								variant="outline"
								size="lg"
								leftIcon={<FaHandHoldingHeart />}
								className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
							>
								<Link href="/donate">Ủng hộ hoạt động</Link>
							</Button>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<Button
								variant="outline"
								size="lg"
								leftIcon={<FaCalendarAlt />}
								className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
							>
								<Link href="/programs">Xem các chương trình</Link>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1 }}
				className="absolute bottom-0 left-0 right-0"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 100"
					className="w-full"
				>
					<path
						fill="#FFFFFF"
						fillOpacity="1"
						d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
					></path>
				</svg>
			</motion.div>
		</div>
	);
}
