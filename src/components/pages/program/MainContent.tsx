"use client";

import { allPrograms } from "@/app/programs/[slug]/helpers";
import GallerySection from "@/components/sections/GallerySection";
import ResultsSection from "@/components/sections/ResultsSection";
import { IProgram } from "@/types/IProgram";
import { Clock } from "lucide-react";
import { useState } from "react";

interface IMainContentProps {
	data: IProgram;
}
function MainContent(props: IMainContentProps) {
	const { data } = props;
	const [activeTab, setActiveTab] = useState("about");
	const program = data?.attributes || {};
	const section = program.sections?.find(
		(item) => item.__component === "program.schedules"
	);
	const results = program.sections?.find(
		(item) => item.__component === "program.results"
	);
	const schedules = section?.schedules || [];
	const galleries = program.gallery?.data || [];

	return (
		<div className="lg:col-span-2">
			<div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
				<div className="border-b">
					<div className="flex gap-4 px-6">
						<button
							onClick={() => setActiveTab("about")}
							className={`py-4 text-base font-medium relative ${
								activeTab === "about"
									? "text-primary-700 border-b-2 border-primary-700"
									: "text-neutral-500 hover:text-neutral-900"
							}`}
						>
							Thông tin
						</button>

						{section && section?.schedules.length > 0 && (
							<button
								onClick={() => setActiveTab("schedule")}
								className={`py-4 text-base font-medium relative ${
									activeTab === "schedule"
										? "text-primary-700 border-b-2 border-primary-700"
										: "text-neutral-500 hover:text-neutral-900"
								}`}
							>
								Lịch trình
							</button>
						)}

						{program.gallery && galleries.length > 0 && (
							<button
								onClick={() => setActiveTab("gallery")}
								className={`py-4 text-base font-medium relative ${
									activeTab === "gallery"
										? "text-primary-700 border-b-2 border-primary-700"
										: "text-neutral-500 hover:text-neutral-900"
								}`}
							>
								Hình ảnh
							</button>
						)}

						{program.status === "completed" && results && (
							<button
								onClick={() => setActiveTab("results")}
								className={`py-4 text-base font-medium relative ${
									activeTab === "results"
										? "text-primary-700 border-b-2 border-primary-700"
										: "text-neutral-500 hover:text-neutral-900"
								}`}
							>
								Kết quả
							</button>
						)}
					</div>
				</div>

				<div className="p-6">
					{activeTab === "about" && (
						<div>
							<div className="prose max-w-none">
								<h2 className="text-2xl font-bold mb-6">Mô tả chương trình</h2>
								{program.longDescription
									.split("\n")
									.map((paragraph: string, idx: number) => (
										<p key={idx} className="mb-4 text-neutral-600">
											{paragraph.trim()}
										</p>
									))}
							</div>
						</div>
					)}

					{activeTab === "schedule" && schedules && (
						<div>
							<h2 className="text-2xl font-bold mb-6">
								Lịch trình chương trình
							</h2>
							<div className="relative border-l-2 border-primary-200 pl-8 ml-4">
								{section?.schedules.map((item: any, idx: number) => (
									<div key={idx} className="mb-10 relative">
										<div className="absolute -left-[41px] w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-white"></div>
										</div>
										<div className="bg-primary-50 p-6 rounded-xl">
											<div className="flex items-center mb-2 text-primary-700 font-medium">
												<Clock className="h-4 w-4 mr-2" />
												{item.time}
											</div>
											<p className="text-neutral-700">{item.activity}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "gallery" && galleries && (
						<GallerySection images={galleries} title={program.title} />
					)}

					{activeTab === "results" &&
						program.status === "completed" &&
						results && (
							<ResultsSection
								results={results}
								category={program.category.data.attributes.name}
							/>
						)}
				</div>
			</div>
		</div>
	);
}

export default MainContent;
