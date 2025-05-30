"use client";

import Button from "@/components/ui/Button";
import { IArticle } from "@/types/IArticle";
import { formatShortDate } from "@/utils/dateTimeHelper";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

interface ISidebarProps {
	data: IArticle;
}
function Sidebar(props: ISidebarProps) {
	const { data } = props || {};
	const program = data?.attributes || {};
	const relatedArticles = program?.relatedArticles?.data || [];
	return (
		<div className="col-span-12 lg:col-span-4">
			{/* Related Posts */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-6 bg-primary-50">
					<h3 className="text-lg font-semibold text-primary-800">
						Bài viết liên quan
					</h3>
				</div>
				<div className="divide-y divide-neutral-100">
					{relatedArticles.map((item) => {
						const { title, slug, image, publishedAt } = item?.attributes || {};
						return (
							<Link
								href={`/news/${slug}`}
								key={item.id}
								className="block hover:bg-neutral-50 transition-colors"
							>
								<div className="p-6">
									<div className="flex items-start space-x-4">
										<div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
											<Image
												src={getStrapiMedia(
													image?.data?.attributes?.formats?.thumbnail?.url || ""
												)}
												alt={title}
												fill
												className="object-cover"
											/>
										</div>
										<div className="flex-1">
											<h4 className="font-medium text-neutral-900 line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors">
												{title}
											</h4>
											<div className="flex items-center text-sm text-neutral-500">
												<FaCalendarAlt size={12} className="mr-2" />
												<time dateTime={formatShortDate(publishedAt)}>
													{formatShortDate(publishedAt)}
												</time>
											</div>
										</div>
										<div className="text-primary-600 flex-shrink-0">
											<FaArrowRight size={16} />
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="p-4 bg-primary-50 text-center">
					<Button variant="primary" size="sm">
						<Link href="/news" className="flex items-center">
							Xem tất cả tin tức
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
