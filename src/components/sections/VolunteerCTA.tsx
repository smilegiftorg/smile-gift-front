"use client";

import { IVolunteerCTASection } from "@/types/IHomePage";
import { motion } from "framer-motion";
import {
	FaCamera,
	FaMicrophone,
	FaPeopleCarry,
	FaUserPlus,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import ViewAllButton from "../ui/ViewAllButton";
import { getIconComponent } from "@/utils/systemIcon";

export default function VolunteerCTA(props: IVolunteerCTASection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const { title, description, benefits, roles, button } = props;
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
			className="bg-white p-8 md:p-10 rounded-lg shadow-lg"
		>
			<h3 className="text-2xl font-bold mb-5">{title}</h3>

			<p className="text-neutral-600 mb-6">{description}</p>

			<div className="grid grid-cols-2 gap-3 mb-6">
				{roles?.data?.map((role) => {
					const { icon, title } = role?.attributes;
					const ICon = getIconComponent(icon);
					return (
						<div
							key={role?.id}
							className="bg-primary-50 p-3 rounded-lg flex items-center"
						>
							{ICon && <ICon className="text-primary-700 mr-2" />}
							<span className="text-sm">{title}</span>
						</div>
					);
				})}
			</div>

			<h4 className="font-semibold mb-3">Bạn sẽ nhận được:</h4>
			<ul className="list-disc pl-5 text-neutral-600 mb-6">
				{benefits?.map((benefit, index) => (
					<li key={index}>{benefit.text}</li>
				))}
			</ul>

			<ViewAllButton {...button} />
		</motion.div>
	);
}
