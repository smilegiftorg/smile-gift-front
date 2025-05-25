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
					{newsItems?.data?.map((news, index) => {
						const { image, title, category, publishedAt, author, description } =
							news?.attributes || {};
						return (
							<motion.div
								key={news.id}
								initial={{ opacity: 0, y: 30 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="h-full flex flex-col">
									<div className="relative h-48 w-full">
										<Image
											src={getStrapiMedia(
												image?.data?.attributes?.formats?.medium?.url || ""
											)}
											alt={title}
											fill
											className="object-cover"
										/>
										<div className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-full">
											{category?.data?.attributes?.name}
										</div>
									</div>

									<div className="p-6 flex-grow flex flex-col">
										<div className="mb-3 flex items-center justify-between text-sm text-neutral-500">
											<div className="flex items-center">
												<FaCalendarAlt className="mr-1" size={12} />
												{publishedAt}
											</div>
											<div className="flex items-center">
												<FaUserAlt className="mr-1" size={12} />
												{author}
											</div>
										</div>

										<h3 className="text-xl font-bold mb-3 line-clamp-2">
											{title}
										</h3>

										<div className="mb-4 flex-grow">
											<p className="text-neutral-600 line-clamp-3">
												{description}
											</p>
										</div>

										<Button
											variant="outline"
											size="sm"
											rightIcon={<FaArrowRight />}
											className="mt-auto"
										>
											<Link href={`/news/${news.id}`}>Đọc tiếp</Link>
										</Button>
									</div>
								</Card>
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
