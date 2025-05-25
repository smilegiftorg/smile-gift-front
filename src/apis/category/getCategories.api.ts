import { QueryConfig } from "@/configs/react-query";
import { fetchAPI } from "@/utils/api";
import {
	keepPreviousData,
	queryOptions,
	useQuery,
} from "@tanstack/react-query";

export const getCategories = async (searchParams: any): Promise<any> => {
	const data = await fetchAPI("api/categories", searchParams, {
		next: { revalidate: 60 },
	});
	return data?.data || [];
};

export const getCategoriesQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["getCategories", JSON.stringify(searchParams)],
		queryFn: () => getCategories(searchParams),
	});
};

type UseCategoriesOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useQueryCategories = ({
	queryConfig,
	searchParams,
}: UseCategoriesOptions) => {
	return useQuery({
		...getCategoriesQueryOptions(searchParams),
		...queryConfig,
		placeholderData: keepPreviousData,
	});
};
