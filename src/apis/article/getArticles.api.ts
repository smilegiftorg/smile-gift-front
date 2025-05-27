import { itemsPerPageDefault } from "@/configs/pagination.config";
import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IArticle } from "@/types/IHomePage";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseArticlesOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const fetchArticles = async (
	searchParams?: any
): Promise<IDataResponse<IArticle[]>> => {
	const { category, page, search } = searchParams || {};
	const urlParamsObject: any = {
		populate: "*",
		pagination: {
			pageSize: itemsPerPageDefault,
			page,
		},
	};

	if (search) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			title: { $containsi: search },
		};
	}

	if (category) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			category: {
				id: { $eq: category },
			},
		};
	}
	const result = await fetchAPI("api/articles", urlParamsObject, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getArticlesQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["articles", searchParams],
		queryFn: () => fetchArticles(searchParams),
	});
};

export const useQueryArticles = ({
	queryConfig,
	searchParams,
}: UseArticlesOptions) => {
	return useQuery({
		...getArticlesQueryOptions(searchParams),
		...queryConfig,
		staleTime: 0,
	});
};
