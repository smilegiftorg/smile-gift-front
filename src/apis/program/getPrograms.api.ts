import { itemsPerPageDefault } from "@/configs/pagination.config";
import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IProgram } from "@/types/IProgram";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseProgramsOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getProgramsQueryOptions>;
};

export const fetchPrograms = async (searchParams?: any): Promise<IDataResponse<IProgram[]>> => {
	const { status, category, page, search } = searchParams || {};
	const urlParamsObject: any = {
		populate: "*",
		pagination: {
			pageSize: itemsPerPageDefault,
			page,
		},
		sort: ["publishedAt:desc"],
	};
	if (status) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			status: { $eq: status },
		};
	}
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
	const result = await fetchAPI("api/programs", urlParamsObject, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getProgramsQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["programs", searchParams],
		queryFn: () => fetchPrograms(searchParams),
	});
};

export const useQueryPrograms = ({ queryConfig, searchParams }: UseProgramsOptions) => {
	return useQuery({
		...getProgramsQueryOptions(searchParams),
		...queryConfig,
		staleTime: 0,
	});
};
