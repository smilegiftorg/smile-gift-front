import {
	fetchProgram,
	getProgramQueryOptions,
} from "@/apis/program/getProgram.api";
import ProgramDetail from "@/components/pages/program";
import NoData from "@/components/pages/program/NoData";
import { IDataResponse } from "@/types/ICommon";
import { IProgram } from "@/types/IProgram";
import { transformToMeta } from "@/utils/meta";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface IPageProps {
	params: { slug: string };
}
export async function generateMetadata({ params }: IPageProps) {
	const { slug } = params || {};
	try {
		const data = await fetchProgram(slug, true);
		const seo = data?.data?.attributes?.seo;
		if (!seo) {
			return {
				title: "CLB Thiện Nguyện Smile Gift",
				description:
					"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
			};
		}
		const meta = transformToMeta(seo);
		return meta;
	} catch (error) {
		return {
			title: "CLB Thiện Nguyện Smile Gift",
			description:
				"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
		};
	}
}

export default async function ProgramDetailPage({ params }: IPageProps) {
	const queryClient = new QueryClient();
	const { slug } = params;

	try {
		const options = getProgramQueryOptions(slug);
		await queryClient.prefetchQuery(options);
		const teacher = queryClient.getQueryData<IDataResponse<IProgram>>(
			options.queryKey
		);
		if (!teacher?.data) {
			return <NoData />;
		}
		const dehydratedState = dehydrate(queryClient);

		return (
			<HydrationBoundary state={dehydratedState}>
				<ProgramDetail />
			</HydrationBoundary>
		);
	} catch (error) {
		console.error("Error fetching teacher:", error);
		notFound();
	}
}
