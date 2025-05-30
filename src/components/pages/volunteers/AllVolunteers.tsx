"use client";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { useCategory, useSearch } from "@/hooks/volunteers/useFilter";
import { usePagination } from "@/hooks/usePagination";
import { FaInbox } from "react-icons/fa";
import VolunteerCard from "./VolunteerCard";
import { useQueryVolunteers } from "@/apis/volunteer/getVolunteers.api";
import CardSkeletons from "@/components/ui/CardSkeletons";

function AllVolunteers() {
	const { filterValue: search } = useSearch();
	const { page } = usePagination();
	const { filterValue: category, removeFilters } = useCategory();

	const { data, isFetching } = useQueryVolunteers({
		searchParams: {
			category,
			page,
			search,
		},
	});
	const { pageCount, total } = data?.meta?.pagination || {};

	const volunteers = data?.data || [];

	return (
		<section className="py-16">
			<div className="container-custom">
				{isFetching && <CardSkeletons />}
				{!isFetching && volunteers && volunteers?.length > 0 && (
					<>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{volunteers?.map((item) => (
								<VolunteerCard key={item.id} volunteer={item} />
							))}
						</div>
						<Pagination totalPages={pageCount || 0} totalItems={total || 0} />
					</>
				)}
				{!isFetching && volunteers && volunteers?.length <= 0 && (
					<div className="text-center py-12">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
							<FaInbox className="w-8 h-8 text-neutral-400" />
						</div>
						<h3 className="text-xl font-bold text-neutral-900 mb-2">
							Không tìm thấy tin tức nào
						</h3>
						<p className="text-neutral-600 mb-6">
							Không có tin tức nào phù hợp với tiêu chí tìm kiếm của bạn.
						</p>
						<Button
							variant="outline"
							onClick={() => {
								removeFilters("status", "category", "page", "search");
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

export default AllVolunteers;
