import { getArticlesQueryOptions } from "@/apis/article/getArticles.api";
import { getCategoriesQueryOptions } from "@/apis/category/getCategories.api";
import { getPage } from "@/apis/page/getPage.api";
import AllArticles from "@/components/pages/articles/AllArticles";
import Header from "@/components/pages/articles/Header";
import { fetchAPI } from "@/utils/api";
import { getStrapiMedia } from "@/utils/helpers";
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
					$eq: "programs",
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
	return {
		title: seo.metaTitle,
		description: seo.metaDescription,
		keywords: seo.keywords,
		robots: seo.metaRobots,
		alternates: {
			canonical: seo.canonicalURL,
		},
		openGraph: {
			title: seo.metaTitle,
			description: seo.metaDescription,
			siteName: "CLB Thiện Nguyện Smile Gift",
			images: getStrapiMedia(seo?.metaImage?.data?.attributes?.url)
				? [
						{
							url: getStrapiMedia(seo?.metaImage?.data?.attributes?.url),
							alt:
								seo?.metaImage?.data?.attributes?.alternativeText ||
								seo.metaTitle,
							width: 1200,
							height: 630,
						},
				  ]
				: [],
			locale: "vi_VN",
			type: "website",
		},
		twitter: seo.metaSocial?.some((m: any) => m.socialNetwork === "Twitter")
			? {
					card: "summary_large_image",
					title: seo.metaTitle,
					description: seo.metaDescription,
					images: seo.metaImage?.data?.attributes?.url
						? [getStrapiMedia(seo.metaImage.data.attributes.url)]
						: [],
			  }
			: undefined,
		other: {
			"structured-data": JSON.stringify(seo.structuredData || {}),
		},
	};
}

export default async function ProgramsPage() {
	const page = await getPage("news", {
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

	await queryClient.prefetchQuery(getArticlesQueryOptions({ page: 1 }));

	await queryClient.prefetchQuery(getCategoriesQueryOptions());
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<Suspense>
				<div className="pt-24">
					<Header {...header} />
					<AllArticles />
				</div>
			</Suspense>
		</HydrationBoundary>
	);
}
