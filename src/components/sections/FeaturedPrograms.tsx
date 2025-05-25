"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IFeaturedProgramsSection } from "@/types/IHomePage";
import { getStrapiMedia } from "@/utils/helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Description from "../ui/Description";
import ViewAllButton from "../ui/ViewAllButton";
import { formatShortDate } from "@/utils/dateTimeHelper";
import ProgramCard from "../pages/programs/ProgramCard";

export default function FeaturedPrograms(props: IFeaturedProgramsSection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const { title, description, programs, viewAllButton } = props;
	console.log("props: ", props?.programs?.data);

	return (
		<section className="py-20" id="upcoming-programs">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="text-center max-w-3xl mx-auto mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
					<Description
						classes="text-lg text-neutral-600"
						description={description}
					/>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{programs?.data.map((program, index) => (
						<motion.div
							key={program.id}
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<ProgramCard program={program} />
						</motion.div>
					))}
				</div>

				<div className="mt-10 text-center">
					<ViewAllButton {...viewAllButton} />
				</div>
			</div>
		</section>
	);
}
