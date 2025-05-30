"use client";

import { useReportDate, useType } from "@/hooks/reports/useFilter";
import { IHeaderSection } from "@/types/IPageData";
import { generateYears } from "@/utils/dateTimeHelper";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";

function Header(props: IHeaderSection) {
	const {
		setFilter: setType,
		removeFilter: removeType,
		filterValue: type,
	} = useType();

	const {
		setFilter: setReportDate,
		removeFilter: removeReportDate,
		filterValue: reportDate,
	} = useReportDate();

	const { title, description, backgroundImage } = props;
	const years = generateYears();
	return (
		<div className="relative bg-primary-800 text-white py-16">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						backgroundImage?.data?.attributes?.formats?.medium?.url ||
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
							<div className="flex gap-4">
								<select
									value={type || ""}
									onChange={(evt) => {
										if (!evt?.target.value) {
											removeType();
										} else {
											setType(evt?.target.value || "");
										}
									}}
									className="py-3 px-4 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
								>
									<option value="">Loại báo cáo</option>
									<option value="quarterly">Báo cáo quý</option>
									<option value="annual">Báo cáo năm</option>
								</select>
							</div>
							<div className="flex gap-4">
								<select
									value={reportDate || ""}
									onChange={(evt) => {
										if (!evt?.target.value) {
											removeReportDate();
										} else {
											setReportDate(evt?.target.value || "");
										}
									}}
									className="py-3 px-4 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
								>
									<option value="">Báo cáo theo năm</option>
									{years.map((item, index) => {
										return (
											<option key={index} value={item}>
												{item}
											</option>
										);
									})}
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
