import { getPage } from "@/apis/page/getPage.api";
import { getReportsQueryOptions } from "@/apis/report/getReports.api";
import Reports from "@/components/pages/reports";
import Header from "@/components/pages/reports/Header";
import { fetchAPI } from "@/utils/api";
import { transformToMeta } from "@/utils/meta";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export async function generateMetadata() {
	const data = await fetchAPI(
		"api/pages",
		{
			filters: {
				slug: {
					$eq: "reports",
				},
			},
			populate: {
				seo: {
					populate: ["metaImage", "metaSocial"],
				},
			},
		},
		{
			next: { revalidate: 60 },
		}
	);

	const seo = data?.data?.[0]?.attributes?.seo;
	if (!seo) {
		return {
			title: "CLB Thiện Nguyện Smile Gift",
			description:
				"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
		};
	}
	const meta = transformToMeta(seo);
	return meta;
}

export default async function ProgramsPage() {
	const page = await getPage("reports", {
		populate: {
			backgroundImage: true,
		},
	});
	const sections = page?.data?.[0]?.attributes?.sessions || [];

	const header = sections.find(
		(item: any) => item.__component === "sections.header"
	);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(getReportsQueryOptions({ page: 1 }));

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<Suspense>
				<div className="pt-24">
					<Header {...header} />
					<Reports />
				</div>
			</Suspense>
		</HydrationBoundary>
	);
}
