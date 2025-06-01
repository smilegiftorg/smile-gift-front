import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IVolunteer } from "@/types/IVolunteer";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseVolunteerOptions = {
	slug: string;
	seo?: boolean;
	queryConfig?: QueryConfig<typeof getVolunteerQueryOptions>;
};

export const fetchVolunteer = async (
	slug: string,
	seo?: boolean
): Promise<IDataResponse<IVolunteer>> => {
	const params = seo ? { seo: "true" } : {};

	const result = await fetchAPI(`api/volunteers/${slug}`, params, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getVolunteerQueryOptions = (slug: string, seo?: boolean) => {
	return queryOptions({
		queryKey: ["fetchVolunteer", [slug, seo]],
		queryFn: () => fetchVolunteer(slug, seo),
	});
};

export const useQueryVolunteer = ({
	queryConfig,
	slug,
}: UseVolunteerOptions) => {
	return useQuery({
		...getVolunteerQueryOptions(slug),
		...queryConfig,
		staleTime: 0,
	});
};
