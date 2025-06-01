import { getCategoriesQueryOptions } from "@/apis/category/getCategories.api";
import { getPage } from "@/apis/page/getPage.api";
import { getProgramsQueryOptions } from "@/apis/program/getPrograms.api";
import AllPrograms from "@/components/pages/programs/AllPrograms";
import Header from "@/components/pages/programs/Header";
import SectionManager from "@/components/sections/SectionManager";
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
					$eq: "du-an",
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
	const page = await getPage("du-an", {
		populate: {
			backgroundImage: true,
			highlightBox: true,
			mainImage: true,
			quoteBox: true,
			missionItems: true,
			coreValues: true,
			buttons: true,
			members: {
				populate: ["image"],
			},
		},
	});
	const sections = page?.data?.[0]?.attributes?.sessions || [];

	const header = sections.find(
		(item: any) => item.__component === "sections.header"
	);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(getProgramsQueryOptions({ page: 1 }));

	await queryClient.prefetchQuery(getCategoriesQueryOptions());
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<Suspense>
				<div className="pt-24">
					<Header {...header} />
					<AllPrograms />
					<SectionManager
						sections={sections?.filter(
							(item: any) => item.__component !== "sections.header"
						)}
					/>
				</div>
			</Suspense>
		</HydrationBoundary>
	);
}
