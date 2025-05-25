"use client";
import { fetchPrograms } from "@/apis/program/getPrograms.api";
import Button from "@/components/ui/Button";
import { useCategory, useStatus } from "@/hooks/programs/useFilter";
import { IProgram } from "@/types/IHomePage";
import { useQuery } from "@tanstack/react-query";
import { FaInbox } from "react-icons/fa";
import ProgramCard from "./ProgramCard";

function AllPrograms() {
	const { filterValue: status, setFilter: setStatus } = useStatus();
	const {
		filterValue: category,
		setFilter: setCategory,
		removeFilters,
	} = useCategory();

	const { data, isFetching } = useQuery({
		queryKey: ["programs", { status, category }],
		queryFn: () => fetchPrograms({ status, category }),
		staleTime: 0,
	});

	const sortedData = (data || [])?.sort((a: any, b: any) => {
		const order: any = { upcoming: 1, completed: 2 };
		return (
			(order[a.attributes.status] || 99) - (order[b.attributes.status] || 99)
		);
	});

	return (
		<section className="py-16">
			<div className="container-custom">
				{isFetching && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map((n) => (
							<div key={n} className="animate-pulse">
								<div className="bg-neutral-200 h-48 rounded-t-lg"></div>
								<div className="bg-white p-6 rounded-b-lg">
									<div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
									<div className="h-8 bg-neutral-200 rounded mb-4"></div>
									<div className="space-y-2">
										<div className="h-4 bg-neutral-200 rounded"></div>
										<div className="h-4 bg-neutral-200 rounded w-5/6"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				{!isFetching && sortedData && sortedData?.length > 0 && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{(sortedData as any)?.map((program: IProgram) => (
							<ProgramCard key={program.id} program={program} />
						))}
					</div>
				)}
				{!isFetching && sortedData && sortedData?.length <= 0 && (
					<div className="text-center py-12">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
							<FaInbox className="w-8 h-8 text-neutral-400" />
						</div>
						<h3 className="text-xl font-bold text-neutral-900 mb-2">
							Không tìm thấy chương trình nào
						</h3>
						<p className="text-neutral-600 mb-6">
							Không có chương trình nào phù hợp với tiêu chí tìm kiếm của bạn.
						</p>
						<Button
							variant="outline"
							onClick={() => {
								removeFilters("status", "category");
							}}
						>
							Xóa bộ lọc
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}

export default AllPrograms;
