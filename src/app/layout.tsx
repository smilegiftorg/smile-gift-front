import "./globals.css";
import { Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import { getStrapiURL } from "@/utils/api";
import { getStrapiMedia } from "@/utils/helpers";

const montserrat = Montserrat({
	subsets: ["latin", "vietnamese"],
	variable: "--font-montserrat",
	display: "swap",
});

const opensans = Open_Sans({
	subsets: ["latin", "vietnamese"],
	variable: "--font-opensans",
	display: "swap",
});

const playfair = Playfair_Display({
	subsets: ["latin", "vietnamese"],
	variable: "--font-playfair",
	weight: ["400", "700"],
	display: "swap",
});

export async function generateMetadata() {
	const metadataBase = new URL(
		process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
	);

	const res = await fetch(
		getStrapiURL(
			"api/homepage?populate[sections][populate]=metaSocial,metaImage"
		),
		{
			next: { revalidate: 60 },
		}
	);
	const data = await res.json();
	const sections = data?.data?.attributes?.sections || [];

	const seo = sections.find(
		(section: any) => section.__component === "shared.seo"
	);

	if (!seo) {
		return {
			metadataBase,
			title: "CLB Thiện Nguyện Smile Gift",
			description:
				"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
		};
	}

	return {
		metadataBase,
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
			url: metadataBase.toString(),
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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const res = await fetch(
		getStrapiURL(
			`api/global?populate[header][populate]=*&populate[footer][populate]=*`
		),
		{
			next: { revalidate: 60 },
		}
	);
	const globalData = await res.json();
	const globalDataAttributes = globalData?.data?.attributes;
	const { header, footer } = globalDataAttributes || {};

	return (
		<html
			lang="vi"
			className={`${montserrat.variable} ${opensans.variable} ${playfair.variable}`}
		>
			<body className="font-body">
				<NextTopLoader showSpinner={false} color="#194923" />
				<Providers>
					<Header data={header} />
					<main className="min-h-screen">{children}</main>
					<Footer data={footer} />
				</Providers>
			</body>
		</html>
	);
}
