import React from "react";

import Image from "next/image";
import { IHeaderSection } from "@/types/IPageData";
import { getStrapiMedia } from "@/utils/helpers";

function Header(props: IHeaderSection) {
	const { title, description, backgroundImage } = props;
	return (
		<div className="relative bg-primary-800 text-white py-20">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						backgroundImage?.data?.attributes?.url ||
							"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
					)}
					alt={backgroundImage?.data?.attributes?.alternativeText || title}
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					className="opacity-20"
				/>
			</div>
			<div className="container-custom relative z-10">
				<div className="max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						{title || "Hành trình lan tỏa yêu thương bằng nghệ thuật"}
					</h1>
					<p className="text-xl mb-4 text-neutral-200">{description}</p>
				</div>
			</div>
		</div>
	);
}

export default Header;
