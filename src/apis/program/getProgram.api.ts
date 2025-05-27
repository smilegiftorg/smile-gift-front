import { QueryConfig } from "@/configs/react-query";
import { IDataResponse } from "@/types/ICommon";
import { IProgram } from "@/types/IProgram";
import { fetchAPI } from "@/utils/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type UseProgramOptions = {
	slug: string;
	seo?: boolean;
	queryConfig?: QueryConfig<typeof getProgramQueryOptions>;
};

export const fetchProgram = async (
	slug: string,
	seo?: boolean
): Promise<IDataResponse<IProgram>> => {
	const params = seo ? { seo: "true" } : {};

	const result = await fetchAPI(`api/programs/${slug}`, params, {
		next: { revalidate: 60 },
	});
	return result;
};

export const getProgramQueryOptions = (slug: string, seo?: boolean) => {
	return queryOptions({
		queryKey: ["fetchProgram", [slug, seo]],
		queryFn: () => fetchProgram(slug, seo),
	});
};

export const useQueryProgram = ({ queryConfig, slug }: UseProgramOptions) => {
	return useQuery({
		...getProgramQueryOptions(slug),
		...queryConfig,
		staleTime: 0,
	});
};
