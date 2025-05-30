"use client";

import { useQueryReports } from "@/apis/report/getReports.api";
import Pagination from "@/components/ui/Pagination";
import ReportCard, { ReportSkeletons } from "./ReportCard";
import Button from "@/components/ui/Button";
import { usePagination } from "@/hooks/usePagination";
import { useReportDate, useType } from "@/hooks/reports/useFilter";
import dayjs from "dayjs";

export default function Reports() {
	const { page } = usePagination();
	const { filterValue: type } = useType();
	const { filterValue: reportDate, removeFilters } = useReportDate();
	const { data, isFetching } = useQueryReports({
		searchParams: {
			page,
			type,
			reportStartTime:
				reportDate && dayjs(`${reportDate}-01-01`).format("YYYY-MM-DD"),
			reportEndTime:
				reportDate && dayjs(`${reportDate}-12-31`).format("YYYY-MM-DD"),
		},
	});

	const reports = data?.data || [];
	const { pageCount, total } = data?.meta?.pagination || {};

	return (
		<section className="py-16">
			<div className="container-custom">
				{isFetching && <ReportSkeletons />}
				{!isFetching && reports.length > 0 && (
					<>
						<div className="space-y-4">
							{reports.map((report) => (
								<div
									key={report.id}
									className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
								>
									<ReportCard report={report} />
								</div>
							))}
						</div>
						<Pagination totalPages={pageCount || 0} totalItems={total || 0} />
					</>
				)}
				{!isFetching && reports.length <= 0 && (
					<div className="text-center py-12">
						<div className="text-5xl mb-4">📊</div>
						<h3 className="text-xl font-bold mb-2">Không tìm thấy báo cáo</h3>
						<p className="text-neutral-600">
							Không có báo cáo nào phù hợp với tiêu chí tìm kiếm của bạn.
						</p>
						<Button
							variant="outline"
							onClick={() => {
								removeFilters("type", "reportDate", "page");
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
