import { QueryConfig } from "@/configs/react-query";
import { fetchAPI } from "@/utils/api";
import {
	keepPreviousData,
	queryOptions,
	useQuery,
} from "@tanstack/react-query";

export const getPrograms = async (params?: { status: any; category: any }) => {
	const { status, category } = params || {};
	const urlParamsObject: any = {
		populate: "*",
	};

	if (status) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			status: { $eq: status },
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

	const response = await fetchAPI("/api/programs", urlParamsObject, {
		next: { revalidate: 60 },
	});
	return response;
};

type UseProgramsOptions = {
	searchParams?: any;
	queryConfig?: QueryConfig<typeof getProgramsQueryOptions>;
};

export const fetchPrograms = async (searchParams?: any) => {
	const { status, category } = searchParams || {};
	const urlParamsObject: any = {
		populate: "*",
	};
	if (status) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			status: { $eq: status },
		};
	}
	if (status) {
		urlParamsObject.filters = {
			...urlParamsObject.filters,
			status: { $eq: status },
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
	return result?.data;
};

export const getProgramsQueryOptions = (searchParams?: any) => {
	const queryKey = ["getPrograms", JSON.stringify(searchParams)];
	console.log("queryKey: ", queryKey);
	return queryOptions({
		queryKey: ["getPrograms", JSON.stringify(searchParams)],
		queryFn: async () => {
			return await fetchPrograms(searchParams);
		},
	});
};

export const useQueryPrograms = ({
	queryConfig,
	searchParams,
}: UseProgramsOptions) => {
	return useQuery({
		...getProgramsQueryOptions(searchParams),
	});
};
