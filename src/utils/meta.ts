import { ISeo } from "@/types/ICommon";
import { getStrapiMedia } from "./helpers";

export const transformToMeta = (seo: ISeo) => {
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
};
