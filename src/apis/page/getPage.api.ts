import { fetchAPI } from "@/utils/api";

export const getPage = async (slug: string, sessions: any) => {
	const pageData = await fetchAPI(
		"api/pages",
		{
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				sessions,
			},
		},
		{
			next: { revalidate: 60 },
		}
	);
	return pageData;
};
