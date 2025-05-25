import { QueryConfig } from "@/configs/react-query";
import { fetchAPI } from "@/utils/api";
import {
	keepPreviousData,
	queryOptions,
	useQuery,
} from "@tanstack/react-query";

export const getArticles = async (searchParams: any): Promise<any> => {
	const data = await fetchAPI("/api/articles", searchParams, {
		next: { revalidate: 60 },
	});
	return data?.data || [];
};

export const getArticlesQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["getArticles", JSON.stringify(searchParams)],
		queryFn: () => getArticles(searchParams),
	});
};

type UseArticlesOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const useQueryArticles = ({
	queryConfig,
	searchParams,
}: UseArticlesOptions) => {
	return useQuery({
		...getArticlesQueryOptions(searchParams),
		...queryConfig,
		refetchOnMount: false,
		placeholderData: keepPreviousData,
	});
};
