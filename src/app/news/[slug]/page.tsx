import {
	fetchArticle,
	getArticleQueryOptions,
} from "@/apis/article/getArticle.api";
import ArticleDetail from "@/components/pages/article";
import NoData from "@/components/pages/article/NoData";
import { IArticle } from "@/types/IArticle";
import { IDataResponse } from "@/types/ICommon";
import { transformToMeta } from "@/utils/meta";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
interface IPageProps {
	params: { slug: string };
}

export async function generateMetadata({ params }: IPageProps) {
	const { slug } = params || {};
	try {
		const data = await fetchArticle(slug, true);
		const seo = data?.data?.attributes?.seo;
		if (!seo) {
			return {
				title: "CLB Thiện Nguyện Smile Gift",
				description:
					"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
			};
		}
		const meta = transformToMeta(seo);
		return meta;
	} catch (error) {
		return {
			title: "CLB Thiện Nguyện Smile Gift",
			description:
				"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
		};
	}
}

export default async function NewsDetailPage({ params }: IPageProps) {
	const queryClient = new QueryClient();
	const { slug } = params;

	try {
		const options = getArticleQueryOptions(slug);
		await queryClient.prefetchQuery(options);
		const article = queryClient.getQueryData<IDataResponse<IArticle>>(
			options.queryKey
		);
		if (!article?.data) {
			return <NoData />;
		}
		const dehydratedState = dehydrate(queryClient);

		return (
			<HydrationBoundary state={dehydratedState}>
				<ArticleDetail />
			</HydrationBoundary>
		);
	} catch (error) {
		console.error("Error fetching article:", error);
		notFound();
	}
}
