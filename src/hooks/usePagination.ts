"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const pageDefault = 1;

export function usePagination() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const pageValue = useMemo(() => {
		const values = searchParams.getAll("page") || [];
		const value = Array.isArray(values) ? values[0] : values;
		return value || "1";
	}, [searchParams]);

	const setPage = useCallback(
		(value?: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set("page", value);
			} else {
				params.delete("page");
			}

			router.push(`?${params.toString()}`, { scroll: true });
		},
		[searchParams, router]
	);

	const onNextPage = (totalPages: number) => {
		if (Number(pageValue) >= totalPages) {
			setPage(pageValue);
			return;
		}
		setPage(String(Number(pageValue) + 1));
	};

	const onPreviousPage = () => {
		if (Number(pageValue) < 1) {
			setPage("1");
			return;
		}
		setPage(String(Number(pageValue) - 1));
	};

	return {
		page: Number(pageValue) || pageDefault,
		onPreviousPage,
		onNextPage,
		setPage,
	};
}
