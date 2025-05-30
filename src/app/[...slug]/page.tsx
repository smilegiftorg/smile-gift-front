import SectionManager from "@/components/sections/SectionManager";
import { IPageProps } from "@/types/ICommon";
import { fetchAPI } from "@/utils/api";
import { getStrapiMedia } from "@/utils/helpers";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }: IPageProps) {
	const slug = params?.slug?.join("/");

	const data = await fetchAPI(
		"api/pages",
		{
			filters: {
				slug: {
					$eq: slug,
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

async function Universals({ params }: IPageProps) {
	const slug = params?.slug?.join("/");
	const data = await fetchAPI(
		"api/pages",
		{
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: {
				sessions: {
					populate: {
						backgroundImage: true,
						highlightBox: true,
						mainImage: true,
						quoteBox: true,
						missionItems: true,
						coreValues: true,
						button: true,
						members: {
							populate: ["image"],
						},
						impacts: true,
						buttons: true,
					},
				},
			},
		},
		{
			next: { revalidate: 60 },
		}
	);
	if (!data?.data || data?.data?.length <= 0) {
		notFound();
	}
	const sections = data?.data?.[0]?.attributes?.sessions || [];
	return (
		<div className="pt-24">
			<SectionManager sections={sections} />
		</div>
	);
}

export default Universals;
