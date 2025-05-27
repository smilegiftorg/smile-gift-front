import { QueryConfig } from "@/configs/react-query";
import { fetchAPI } from "@/utils/api";
import {
	keepPreviousData,
	queryOptions,
	useQuery,
} from "@tanstack/react-query";

export const getCategories = async (): Promise<any> => {
	const data = await fetchAPI(
		"api/categories",
		{ populate: "*" },
		{
			next: { revalidate: 60 },
		}
	);
	return data?.data || [];
};

export const getCategoriesQueryOptions = () => {
	return queryOptions({
		queryKey: ["getCategories"],
		queryFn: () => getCategories(),
	});
};

type UseCategoriesOptions = {
	queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useQueryCategories = ({ queryConfig }: UseCategoriesOptions) => {
	return useQuery({
		...getCategoriesQueryOptions(),
		...queryConfig,
		placeholderData: keepPreviousData,
	});
};
