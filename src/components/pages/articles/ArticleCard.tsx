import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IArticle } from "@/types/IArticle";
import { formatShortDate } from "@/utils/dateTimeHelper";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaUserAlt } from "react-icons/fa";

function ArticleCard({ article }: { article: IArticle }) {
	const { image, title, category, publishedAt, author, description } =
		article?.attributes || {};

	return (
		<Card className="h-full flex flex-col">
			<div className="relative h-48 w-full">
				<Image
					src={getStrapiMedia(
						image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={title}
					fill
					className="object-cover"
				/>
				<div className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-full">
					{category?.data?.attributes?.name}
				</div>
			</div>

			<div className="p-6 flex-grow flex flex-col">
				<div className="mb-3 flex items-center justify-between text-sm text-neutral-500">
					<div className="flex items-center">
						<FaCalendarAlt className="mr-1" size={12} />
						{formatShortDate(publishedAt)}
					</div>
					<div className="flex items-center">
						<FaUserAlt className="mr-1" size={12} />
						{author}
					</div>
				</div>

				<h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>

				<div className="mb-4 flex-grow">
					<p className="text-neutral-600 line-clamp-3">{description}</p>
				</div>

				<Button
					variant="outline"
					size="sm"
					rightIcon={<FaArrowRight />}
					className="mt-auto"
				>
					<Link href={`/news/${article.id}`}>Đọc tiếp</Link>
				</Button>
			</div>
		</Card>
	);
}

export default ArticleCard;
