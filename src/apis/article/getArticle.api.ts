import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IArticle } from "@/types/IArticle";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseArticleOptions = {
	slug: string;
	seo?: boolean;
	queryConfig?: QueryConfig<typeof getArticleQueryOptions>;
};

export const fetchArticle = async (
	slug: string,
	seo?: boolean
): Promise<IDataResponse<IArticle>> => {
	const params = seo ? { seo: "true" } : {};

	const result = await fetchAPI(`api/articles/slug/${slug}`, params, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getArticleQueryOptions = (slug: string, seo?: boolean) => {
	return queryOptions({
		queryKey: ["fetchArticle", [slug, seo]],
		queryFn: () => fetchArticle(slug, seo),
	});
};

export const useQueryArticle = ({ queryConfig, slug }: UseArticleOptions) => {
	return useQuery({
		...getArticleQueryOptions(slug),
		...queryConfig,
		staleTime: 0,
	});
};
