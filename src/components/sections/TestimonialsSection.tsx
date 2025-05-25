"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaQuoteLeft } from "react-icons/fa";
import { ITestimonialsSection } from "@/types/IHomePage";
import Description from "../ui/Description";
import { getStrapiMedia } from "@/utils/helpers";

export default function TestimonialsSection(props: ITestimonialsSection) {
	const [activeTestimonial, setActiveTestimonial] = useState(0);
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const { title, description, testimonials: testimonialsData } = props;
	const testimonials =
		testimonialsData?.data.map((item) => ({
			id: item.id,
			name: item.attributes.name,
			role: item.attributes.role,
			content: item.attributes.content,
			image: getStrapiMedia(
				item.attributes.image.data.attributes.formats?.thumbnail?.url || ""
			),
		})) || [];

	return (
		<section className="py-20 bg-primary-700">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
						{title}
					</h2>
					<Description
						description={description}
						classes="text-lg text-neutral-200 max-w-2xl mx-auto"
					/>
				</motion.div>

				<div className="grid md:grid-cols-12 gap-8">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="md:col-span-7 lg:col-span-8"
					>
						<div className="relative bg-white rounded-lg p-8 md:p-10 shadow-xl">
							<div className="text-primary-300 mb-6">
								<FaQuoteLeft size={40} />
							</div>

							<p className="text-lg md:text-xl mb-6 text-neutral-700 font-serif italic">
								{testimonials[activeTestimonial].content}
							</p>

							<div className="flex items-center">
								<div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
									<Image
										src={testimonials[activeTestimonial].image}
										alt={testimonials[activeTestimonial].name}
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<div className="font-semibold text-lg">
										{testimonials[activeTestimonial].name}
									</div>
									<div className="text-neutral-500">
										{testimonials[activeTestimonial].role}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="md:col-span-5 lg:col-span-4 flex flex-col justify-center"
					>
						<h3 className="text-xl font-semibold mb-6 text-white">
							Chia sẻ khác
						</h3>

						<div className="space-y-4">
							{testimonials.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className={`cursor-pointer transition-all duration-300 p-4 rounded-lg ${
										activeTestimonial === index
											? "bg-white"
											: "bg-white/10 hover:bg-white/20"
									}`}
									onClick={() => setActiveTestimonial(index)}
								>
									<div className="flex items-center">
										<div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
											<Image
												src={testimonial.image}
												alt={testimonial.name}
												fill
												className="object-cover"
											/>
										</div>
										<div>
											<div
												className={`font-medium ${
													activeTestimonial === index
														? "text-primary-700"
														: "text-white"
												}`}
											>
												{testimonial.name}
											</div>
											<div
												className={
													activeTestimonial === index
														? "text-neutral-500"
														: "text-neutral-300"
												}
											>
												{testimonial.role}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
