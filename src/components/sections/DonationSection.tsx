"use client";

import Button from "@/components/ui/Button";
import { IDonationSection } from "@/types/IHomePage";
import { getIconComponent } from "@/utils/systemIcon";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Description from "../ui/Description";

export default function DonationSection(props: IDonationSection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const { title, description, buttons, sponsoredItems, bankInfo } = props || {};
	const { bankName, accountNumber, accountHolder } = bankInfo || {};
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="bg-white p-8 md:p-10 rounded-lg shadow-lg"
		>
			<h3 className="text-2xl font-bold mb-5">{title}</h3>
			<Description description={description} classes="text-neutral-600 mb-6" />

			<div className="mb-6 bg-neutral-50 rounded-lg p-5">
				<h4 className="font-semibold mb-3 flex items-center">
					<FaHandHoldingHeart className="text-primary-700 mr-2" />
					Tài trợ cho:
				</h4>
				<div className="grid grid-cols-2 gap-3">
					{sponsoredItems.map((item, index) => (
						<div key={index} className="text-sm">
							• {item?.label}
						</div>
					))}
				</div>
			</div>

			<div className="mb-6 bg-primary-50 rounded-lg p-5">
				<h4 className="font-semibold mb-3">Thông tin quyên góp:</h4>
				<div className="mb-3">
					<div className="text-sm text-neutral-500">Ngân hàng:</div>
					<div className="font-medium">{bankName}</div>
				</div>
				<div className="mb-3">
					<div className="text-sm text-neutral-500">Số tài khoản:</div>
					<div className="font-medium">{accountNumber}</div>
				</div>
				<div>
					<div className="text-sm text-neutral-500">Chủ tài khoản:</div>
					<div className="font-medium">{accountHolder}</div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-3">
				{buttons.map((button, index) => {
					const { link, icon, text, variant } = button || {};
					const IConComp = getIconComponent(icon);
					return (
						<Button
							key={index}
							variant={variant}
							size="md"
							leftIcon={IConComp && <IConComp />}
							className="flex-1"
						>
							<Link href={link || "/"}>{text}</Link>
						</Button>
					);
				})}
			</div>
		</motion.div>
	);
}
