import { itemsPerPageDefault } from "@/configs/pagination.config";
import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IVolunteer } from "@/types/IVolunteer";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseVolunteersOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getVolunteerQueryOptions>;
};

export const fetchVolunteers = async (searchParams?: any): Promise<IDataResponse<IVolunteer[]>> => {
	const { category, page, search } = searchParams || {};
	const urlParamsObject: any = {
		populate: "*",
		pagination: {
			pageSize: itemsPerPageDefault,
			page,
		},
		sort: ["publishedAt:desc"],
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
	const result = await fetchAPI("api/volunteers", urlParamsObject, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getVolunteerQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["reports", searchParams],
		queryFn: () => fetchVolunteers(searchParams),
	});
};

export const useQueryVolunteers = ({ queryConfig, searchParams }: UseVolunteersOptions) => {
	return useQuery({
		...getVolunteerQueryOptions(searchParams),
		...queryConfig,
		staleTime: 0,
	});
};
