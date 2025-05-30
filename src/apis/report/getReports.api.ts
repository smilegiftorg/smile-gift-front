import { itemsPerPageDefault } from "@/configs/pagination.config";
import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IReport } from "@/types/IReport";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseReportsOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getReportsQueryOptions>;
};

export const fetchReports = async (
	searchParams?: any
): Promise<IDataResponse<IReport[]>> => {
	const { type, reportStartTime, reportEndTime, page } = searchParams || {};
	const urlParamsObject: any = {
		populate: "*",
		pagination: {
			pageSize: itemsPerPageDefault,
			page,
		},
	};
	if (type) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			type: { $eq: type },
		};
	}
	if (reportStartTime && reportEndTime) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			reportDate: {
				$gte: reportStartTime,
				$lte: reportEndTime,
			},
		};
	}
	const result = await fetchAPI("api/reports", urlParamsObject, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getReportsQueryOptions = (searchParams?: any) => {
	return queryOptions({
		queryKey: ["reports", searchParams],
		queryFn: () => fetchReports(searchParams),
	});
};

export const useQueryReports = ({
	queryConfig,
	searchParams,
}: UseReportsOptions) => {
	return useQuery({
		...getReportsQueryOptions(searchParams),
		...queryConfig,
		staleTime: 0,
	});
};
