"use client";
import { useQueryArticles } from "@/apis/article/getArticles.api";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { useCategory, useSearch } from "@/hooks/articles/useFilter";
import { usePagination } from "@/hooks/usePagination";
import { IArticle } from "@/types/IArticle";
import { FaInbox } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
import CardSkeletons from "@/components/ui/CardSkeletons";

function AllPrograms() {
	const { filterValue: search } = useSearch();
	const { page } = usePagination();
	const { filterValue: category, removeFilters } = useCategory();

	const { data, isFetching } = useQueryArticles({
		searchParams: {
			category,
			page,
			search,
		},
	});
	const articlesData = data?.data || [];
	const { pageCount, total } = data?.meta?.pagination || {};

	return (
		<section className="py-16">
			<div className="container-custom">
				<CardSkeletons />
				{isFetching && <CardSkeletons />}
				{!isFetching && articlesData?.length > 0 && (
					<>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{(articlesData as any)?.map((article: IArticle) => (
								<ArticleCard key={article.id} article={article} />
							))}
						</div>
						<Pagination totalPages={pageCount || 0} totalItems={total || 0} />
					</>
				)}
				{!isFetching && articlesData?.length <= 0 && (
					<div className="text-center py-12">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
							<FaInbox className="w-8 h-8 text-neutral-400" />
						</div>
						<h3 className="text-xl font-bold text-neutral-900 mb-2">
							Không tìm thấy tin tức nào
						</h3>
						<p className="text-neutral-600 mb-6">
							Không có tin tức nào phù hợp với tiêu chí tìm kiếm của bạn.
						</p>
						<Button
							variant="outline"
							onClick={() => {
								removeFilters("category", "page", "search");
							}}
						>
							Xóa bộ lọc
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}

export default AllPrograms;
