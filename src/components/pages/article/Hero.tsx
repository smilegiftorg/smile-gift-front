import React from "react";
import Image from "next/image";
import { IArticle } from "@/types/IArticle";
import { getStrapiMedia } from "@/utils/helpers";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { formatShortDate } from "@/utils/dateTimeHelper";

interface IHeroProps {
	data: IArticle;
}

function Hero({ data }: IHeroProps) {
	const article = data?.attributes || {};
	return (
		<div className="relative bg-primary-800 text-white py-16">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						article.image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={article.title}
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					className="opacity-20"
					priority
				/>
			</div>
			<div className="container-custom relative z-10">
				<div className="max-w-3xl">
					<div className="flex items-center space-x-4 mb-4">
						<span className="bg-primary-700 text-white text-sm font-medium px-3 py-1 rounded-full">
							{article.category?.data?.attributes?.name || "Chưa có danh mục"}
						</span>
						<time
							dateTime={formatShortDate(article.publishedAt)}
							className="flex items-center text-neutral-200"
						>
							<FaCalendarAlt className="mr-2" size={14} />
							{formatShortDate(article.publishedAt)}
						</time>
						<div className="flex items-center text-neutral-200">
							<FaUserAlt className="mr-2" size={14} />
							{article.author}
						</div>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						{article.title}
					</h1>
					<p className="text-xl mb-4 text-neutral-200">{article.description}</p>
				</div>
			</div>
		</div>
	);
}

export default Hero;
