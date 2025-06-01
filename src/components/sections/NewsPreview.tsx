"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { INewsPreviewSection } from "@/types/IHomePage";
import { getStrapiMedia } from "@/utils/helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Description from "../ui/Description";
import ViewAllButton from "../ui/ViewAllButton";
import ArticleCard from "../pages/articles/ArticleCard";

export default function NewsPreview(props: INewsPreviewSection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const { title, description, newsItems, viewAllButton } = props;
	return (
		<section className="py-20">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

					<Description
						description={description}
						classes="text-lg text-neutral-600 max-w-2xl mx-auto"
					/>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{newsItems?.data?.slice(0, 3)?.map((news, index) => {
						return (
							<motion.div
								key={news.id}
								initial={{ opacity: 0, y: 30 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<ArticleCard article={news} />
							</motion.div>
						);
					})}
				</div>

				<div className="mt-10 text-center">
					<ViewAllButton {...viewAllButton} />
				</div>
			</div>
		</section>
	);
}
