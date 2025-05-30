import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import NoData from "@/components/pages/program/NoData";
import { getProgramQueryOptions } from "@/apis/program/getProgram.api";
import { IDataResponse } from "@/types/ICommon";
import { IProgram } from "@/types/IProgram";
import RegisterProgram from "@/components/pages/registerProgram";

export async function generateMetadata() {
	return {
		title: "Đăng ký tham gia chương trình",
		description:
			"Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật và mong muốn dùng tài năng để trao đi yêu thương.",
	};
}

export default async function RegisterPage({
	params,
}: {
	params: { slug: string };
}) {
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
				<RegisterProgram />
			</HydrationBoundary>
		);
	} catch (error) {
		console.error("Error fetching teacher:", error);
		notFound();
	}
}
