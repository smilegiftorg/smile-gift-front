"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@/components/ui/Button";
import { IAboutPreviewSection } from "@/types/IHomePage";
import { getIconComponent } from "@/utils/systemIcon";

export default function AboutPreview(props: IAboutPreviewSection) {
	const { title, description, quote, image, coreValue, stat, button } = props;

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const Icon = getIconComponent(button.icon);

	return (
		<section className="py-20">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="grid md:grid-cols-2 gap-10 items-center"
				>
					{/* Left Side */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h2 className="title-underline text-3xl md:text-4xl font-bold mb-6">
							{title}
						</h2>

						<p
							className="text-lg mb-6 text-neutral-700"
							dangerouslySetInnerHTML={{ __html: description }}
						/>

						<div className="mb-8 p-4 border-l-4 border-primary-700 bg-primary-50">
							<p className="text-primary-800 italic font-serif">"{quote}"</p>
						</div>

						{coreValue && (
							<>
								<h3 className="text-xl font-semibold mb-3">
									{coreValue.title}
								</h3>
								<div className="grid grid-cols-2 gap-3 mb-8">
									{coreValue.items.map((item) => (
										<div
											key={item.id}
											className="bg-white p-3 rounded-lg shadow-sm border border-neutral-100"
										>
											<div className="font-medium text-primary-700">
												{item.value}
											</div>
										</div>
									))}
								</div>
							</>
						)}

						<Link href={button.link}>
							<Button
								variant={button.variant}
								rightIcon={Icon ? <Icon /> : undefined}
								className="mt-2"
							>
								{button.text}
							</Button>
						</Link>
					</motion.div>

					{/* Right Side */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="relative aspect-[4/5] rounded-lg"
					>
						<div>
							<Image
								src={
									image?.data?.attributes?.url ??
									"https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg"
								}
								alt={
									image?.data?.attributes?.alternativeText ??
									"Hoạt động thiện nguyện"
								}
								fill
								className="object-cover rounded-lg"
							/>
						</div>

						{stat && (
							<div className="absolute -bottom-10 -left-10 w-2/3 bg-white p-4 rounded-lg shadow-xl">
								<div className="bg-primary-50 p-4 rounded">
									<div className="text-sm text-primary-600 font-medium mb-1">
										{stat.title}
									</div>
									<div className="grid grid-cols-2 gap-4">
										{stat.items.map((item) => (
											<div key={item.id}>
												<div className="text-3xl font-bold text-primary-700">
													{item.value}
												</div>
												<div className="text-sm text-neutral-600">
													{item.description}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
