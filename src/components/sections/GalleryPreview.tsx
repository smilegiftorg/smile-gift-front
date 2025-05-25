"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/ui/Button";
import { FaArrowRight, FaArrowLeft, FaImage } from "react-icons/fa";
import { IGalleryPreviewSection } from "@/types/IHomePage";
import { getStrapiMedia } from "@/utils/helpers";
import Description from "../ui/Description";
import ViewAllButton from "../ui/ViewAllButton";

export default function GalleryPreview(props: IGalleryPreviewSection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	const { title, description, galleryItems, viewAllButton } = props;

	return (
		<section className="py-20 bg-neutral-50">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col md:flex-row md:items-end justify-between mb-12"
				>
					<div className="mb-6 md:mb-0">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
						<Description
							classes="text-lg text-neutral-600 max-w-2xl"
							description={description}
						/>
					</div>

					<div className="flex space-x-3">
						<button
							ref={navigationPrevRef}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
						>
							<FaArrowLeft size={16} />
						</button>
						<button
							ref={navigationNextRef}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
						>
							<FaArrowRight size={16} />
						</button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={24}
						slidesPerView={1}
						autoplay={{ delay: 5000 }}
						pagination={{ clickable: true }}
						navigation={{
							prevEl: navigationPrevRef.current,
							nextEl: navigationNextRef.current,
						}}
						onInit={(swiper) => {
							// @ts-ignore
							swiper.params.navigation.prevEl = navigationPrevRef.current;
							// @ts-ignore
							swiper.params.navigation.nextEl = navigationNextRef.current;
							swiper.navigation.init();
							swiper.navigation.update();
						}}
						breakpoints={{
							640: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
						}}
						className="pb-12"
					>
						{galleryItems.data.map((item) => (
							<SwiperSlide key={item.id}>
								<div className="h-full">
									<div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
										<div className="relative h-64 w-full">
											<Image
												src={getStrapiMedia(
													item?.attributes?.image?.data?.attributes?.formats
														?.medium?.url || ""
												)}
												alt={item.attributes.title}
												fill
												className="object-cover"
											/>
										</div>
										<div className="p-5">
											<div className="text-sm text-neutral-500 mb-2">
												{item.attributes.date}
											</div>
											<h3 className="text-lg font-semibold">
												{item.attributes.title}
											</h3>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-8 text-center"
				>
					<ViewAllButton {...viewAllButton} />
				</motion.div>
			</div>
		</section>
	);
}
