import React from "react";
import Image from "next/image";
import { IOurStorySection } from "@/types/IPageData";
import Description from "../ui/Description";
import { getStrapiMedia } from "@/utils/helpers";

function OurStory(props: IOurStorySection) {
	const { content, highlightBox, quoteBox, mainImage, title } = props;
	return (
		<section className="py-16">
			<div className="container-custom">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h2 className="text-3xl font-bold mb-6 title-underline">{title}</h2>

						<Description description={content} classes="" />

						<div className="p-5 bg-primary-50 rounded-lg mb-6">
							<h3 className="text-xl font-semibold mb-4">
								{highlightBox?.title}
							</h3>
							<p className="text-primary-800 italic text-xl font-serif">
								{`"${highlightBox?.quote}"`}
							</p>
						</div>
					</div>

					<div className="relative">
						<div className="aspect-[4/3] rounded-lg overflow-hidden">
							<Image
								src={getStrapiMedia(
									mainImage?.data?.attributes?.formats?.medium?.url ||
										"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
								)}
								alt={mainImage?.data?.attributes?.alternativeText || title}
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-lg shadow-xl max-w-xs">
							<p className="italic text-primary-700">
								{`"${quoteBox?.quote}"`}
							</p>
							<div className="mt-3 font-medium">- {quoteBox?.attribution}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OurStory;
