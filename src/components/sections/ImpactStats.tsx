"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IImpactStatsSection } from "@/types/IHomePage";
import { getIconComponent } from "@/utils/systemIcon";

export default function ImpactStats({ title, stats }: IImpactStatsSection) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const counterVariants = {
		hidden: { opacity: 0, y: 20 },
		show: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
			},
		}),
	};

	return (
		<section className="bg-primary-800 py-16">
			<div className="container-custom">
				<motion.div
					ref={ref}
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
						{title}
					</h2>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
						{stats.map((stat, index) => {
							const Icon = getIconComponent(stat.icon);

							return (
								<motion.div
									key={stat.id}
									custom={index}
									variants={counterVariants}
									initial="hidden"
									animate={inView ? "show" : "hidden"}
									className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
								>
									<div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-secondary-500 bg-white rounded-full">
										{Icon && <Icon />}
									</div>
									<div className="flex justify-center items-baseline mb-2">
										<motion.span
											initial={{ opacity: 0 }}
											animate={inView ? { opacity: 1 } : { opacity: 0 }}
											transition={{
												duration: 1.5,
												delay: index * 0.1 + 0.3,
											}}
											className="text-4xl font-bold text-white"
										>
											{stat.value}
										</motion.span>
										{stat.unit && (
											<span className="text-xl font-medium text-white ml-1">
												{stat.unit}
											</span>
										)}
									</div>
									<p className="text-sm text-neutral-200">{stat.description}</p>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
