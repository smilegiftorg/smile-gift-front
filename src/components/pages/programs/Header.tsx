"use client";

import React, { ChangeEvent, useCallback } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IHeaderSection } from "@/types/IPageData";
import { getStrapiMedia } from "@/utils/helpers";
import { useCategory, useSearch, useStatus } from "@/hooks/programs/useFilter";
import { useQueryCategories } from "@/apis/category/getCategories.api";
import FieldSearch from "@/components/ui/FieldSearch";

function Header(props: IHeaderSection) {
	const {
		setFilter: setStatus,
		removeFilter: removeStatus,
		filterValue: status,
	} = useStatus();
	const { setFilter: setSearch, filterValue: search } = useSearch();
	const {
		setFilter: setCategory,
		removeFilter: removeCategory,
		filterValue: cate,
	} = useCategory();
	const { title, description, backgroundImage } = props;

	const { data, isFetching, isLoading } = useQueryCategories({
		queryConfig: {},
	});
	const onChangeFieldSearch = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value || ""),
		[setSearch]
	);
	return (
		<div className="relative bg-primary-800 text-white py-16">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						backgroundImage?.data?.attributes?.url ||
							"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
					)}
					alt={backgroundImage?.data?.attributes?.alternativeText || title}
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					className="opacity-20"
				/>
			</div>
			<div className="container-custom relative z-10">
				<div className="max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						{title || "Chương trình thiện nguyện của Smile Gift"}
					</h1>
					<p className="text-xl mb-8 text-neutral-200">{description}</p>

					<div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
						<div className="flex flex-col md:flex-row gap-4">
							<FieldSearch
								currentValue={search}
								onChange={onChangeFieldSearch}
								placeholder="Tìm kiếm theo tên dự án"
							/>
							<div className="flex gap-4">
								<select
									value={cate || ""}
									onChange={(evt) => {
										if (!evt?.target.value) {
											removeCategory();
										} else {
											setCategory(evt?.target.value || "");
										}
									}}
									className="py-3 px-4 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
								>
									<option value="">Tất cả danh mục</option>
									{!isFetching &&
										!isLoading &&
										data?.map((category: any) => (
											<option key={category.id} value={category.id}>
												{category.attributes.name}
											</option>
										))}
								</select>
								<select
									value={status || ""}
									onChange={(evt) => {
										if (!evt?.target.value) {
											removeStatus();
										} else {
											setStatus(evt?.target.value || "");
										}
									}}
									className="py-3 px-4 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
								>
									<option value="">Trạng thái</option>
									<option value="upcoming">Sắp diễn ra</option>
									<option value="completed">Đã hoàn thành</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
