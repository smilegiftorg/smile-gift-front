"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { usePagination } from "../usePagination";

export interface IFilterValue {
	filterName: string;
	values: string[];
}

function filterHookFactory(filterName: string = "status") {
	return function useFilter() {
		const pathname = usePathname();
		const { page } = usePagination();
		const searchParams = useSearchParams();
		const router = useRouter();

		const filterValues = useMemo(() => {
			const values = searchParams.getAll(filterName) || [];
			return values;
		}, [searchParams]);

		const filterValue = useMemo(() => {
			const values = searchParams.getAll(filterName) || [];
			const value = Array.isArray(values) ? values[0] : values;
			return value;
		}, [searchParams]);

		const setFilters = useCallback(
			(values: string | IFilterValue[]) => {
				const params = new URLSearchParams(searchParams.toString());

				const currentValues = params.getAll(filterName);
				const isValueExist = currentValues.includes(values as string);

				if (isValueExist) {
					params.delete(filterName);
					currentValues
						.filter((v) => v !== values)
						.forEach((v) => params.append(filterName, v));
				} else {
					params.append(filterName, values as string);
				}
				if (page) {
					params.delete("page");
				}
				router.push(`${pathname}?${params.toString()}`, {
					scroll: false,
				});
			},
			[searchParams, page, router, pathname]
		);

		const setFilter = useCallback(
			(value?: string) => {
				const params = new URLSearchParams(searchParams.toString());
				if (value) {
					params.set(filterName, value);
				} else {
					params.delete(filterName);
				}
				if (page) {
					params.delete("page");
				}
				router.push(`?${params.toString()}`, { scroll: false });
			},
			[searchParams, page, router]
		);

		const removeFilter = () => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(filterName);
			router.push(`${pathname}?${params.toString()}`, {
				scroll: false,
			});
		};

		const removeFilters = (...filters: string[]) => {
			const params = new URLSearchParams(searchParams.toString());
			filters.forEach((filter) => params.delete(filter));
			router.push(`${pathname}?${params.toString()}`, {
				scroll: false,
			});
		};

		return {
			filterValues,
			setFilters,
			setFilter,
			removeFilter,
			removeFilters,
			filterValue,
		};
	};
}

export const useSetMultiFilters = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const params = new URLSearchParams(searchParams.toString());

	const setMultiFilters = (items: IFilterValue[] = []) => {
		items.forEach((item) => {
			const { filterName, values } = item || {};
			params.delete(filterName);
			values.forEach((value) => {
				params.append(filterName, value);
			});
		});
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const removeMultiFilters = () => {
		Array.from(searchParams.keys()).forEach((key) => {
			params.delete(key);
		});
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return { setMultiFilters, removeMultiFilters };
};

export const useStatus = filterHookFactory("status");
export const useCategory = filterHookFactory("category");
