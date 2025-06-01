"use client";

import Button from "@/components/ui/Button";
import Description from "@/components/ui/Description";
import RichText from "@/components/ui/RichText";
import { IArticle } from "@/types/IArticle";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaFacebook, FaLink, FaTwitter } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

interface IMainContentProps {
	data: IArticle;
}
function MainContent(props: IMainContentProps) {
	const { data } = props;
	const article = data?.attributes || {};

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	return (
		<div ref={ref} className="col-span-12 lg:col-span-8">
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="relative aspect-video w-full">
					<Image
						src={getStrapiMedia(
							article.image?.data?.attributes?.formats?.medium?.url || ""
						)}
						alt={article.title}
						fill
						className="object-cover"
					/>
				</div>

				<div className="p-8">
					<article className="prose prose-lg max-w-none">
						<RichText content={article.longDescription || ""} />
					</article>

					{/* Share */}
					<div className="mt-8 pt-8 border-t">
						<h3 className="text-lg font-semibold mb-4">Chia sẻ bài viết</h3>
						<div className="flex space-x-4">
							<button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:bg-[#166fe5] transition-colors">
								<FaFacebook size={20} />
							</button>
							<button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1da1f2] text-white hover:bg-[#1a91da] transition-colors">
								<FaTwitter size={20} />
							</button>
							<button className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors">
								<FaLink size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<div className="mt-8">
				<Button variant="outline">
					<Link href="/tin-tuc" className="flex items-center">
						<FaArrowLeft className="mr-2" />
						<span>Quay lại tin tức</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default MainContent;
