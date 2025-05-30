import { IDonationImpactSection } from "@/types/IPageData";
import { getIconComponent } from "@/utils/systemIcon";
import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";

function DonationImpacts(props: IDonationImpactSection) {
	const { title, impacts } = props;
	return (
		<section className="py-16">
			<div className="container-custom">
				<h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>

				<div className="grid md:grid-cols-4 gap-6">
					{impacts.map((item, index) => {
						const Icon = getIconComponent(item?.icon);
						return (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow-md text-center"
							>
								<div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-700 rounded-full mb-4 text-2xl">
									{Icon ? <Icon /> : null}
								</div>
								<div className="text-2xl font-bold text-primary-700 mb-2">
									{item.amount}
								</div>
								<p className="text-neutral-600">{item.impact}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default DonationImpacts;
