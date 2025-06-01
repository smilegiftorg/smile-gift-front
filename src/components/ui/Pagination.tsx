import React, { useState } from "react";
import Button from "./Button";
import { usePagination } from "@/hooks/usePagination";

interface IPaginationProps {
	totalPages: number;
	totalItems: number;
}
function Pagination({ totalPages, totalItems }: IPaginationProps) {
	const { onNextPage, page, onPreviousPage, setPage } = usePagination();
	const [pageInputValue, setPageInputValue] = useState("1");
	const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPageInputValue(value);

		const pageNumber = parseInt(value);
		if (pageNumber > totalPages) {
			setPageInputValue(String(totalPages));
		}
		if (pageNumber < 1) {
			setPageInputValue("1");
		}
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setPage(String(pageNumber));
		}
	};

	return (
		<div className="mt-12 flex justify-center items-center gap-4">
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPreviousPage()}
				disabled={page === 1}
			>
				Trước
			</Button>

			<div className="flex items-center gap-2">
				<input
					type="text"
					value={pageInputValue}
					onChange={handlePageInputChange}
					className="w-16 text-center px-2 py-1 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
				/>
				<span className="text-neutral-600">/ {totalPages}</span>
			</div>

			<Button
				variant="outline"
				size="sm"
				onClick={() => onNextPage(totalItems)}
				disabled={page === totalPages}
			>
				Tiếp
			</Button>
		</div>
	);
}

export default Pagination;
