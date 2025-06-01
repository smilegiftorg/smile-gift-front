import { fetchVolunteer } from "@/apis/volunteer/getVolunteer.api";
import { getVolunteerQueryOptions } from "@/apis/volunteer/getVolunteers.api";
import VolunteerDetail from "@/components/pages/volunteer";
import NoData from "@/components/ui/NoData";
import { IDataResponse } from "@/types/ICommon";
import { IVolunteer } from "@/types/IVolunteer";
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
		const data = await fetchVolunteer(slug, true);
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

export default async function VolunteerDetailPage({ params }: IPageProps) {
	const queryClient = new QueryClient();
	const { slug } = params;

	try {
		const options = getVolunteerQueryOptions(slug);
		await queryClient.prefetchQuery(options);
		const volunteer = queryClient.getQueryData<IDataResponse<IVolunteer>>(
			options.queryKey
		);
		if (!volunteer?.data) {
			return (
				<NoData
					title="Không tìm thấy tin tuyển TNV"
					subtitle="Tin tuyển TNV này không tồn tại hoặc đã hết hạn."
					buttonLink="/volunteer"
				/>
			);
		}
		const dehydratedState = dehydrate(queryClient);

		return (
			<HydrationBoundary state={dehydratedState}>
				<VolunteerDetail />
			</HydrationBoundary>
		);
	} catch (error) {
		console.error("Error fetching article:", error);
		notFound();
	}
}
