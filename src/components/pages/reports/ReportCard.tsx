import Button from "@/components/ui/Button";
import { IReport } from "@/types/IReport";
import React from "react";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

export function ReportSkeletons() {
	return (
		<div className="space-y-4">
			{[1, 2, 3, 4, 5].map((_, index) => (
				<div
					key={index}
					className="flex items-start justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
				>
					<div className="flex-1">
						<div className="flex items-center mb-2">
							<div className="w-5 h-5 bg-neutral-200 rounded mr-2"></div>{" "}
							<div className="h-5 bg-neutral-200 rounded w-2/3"></div>{" "}
						</div>
						<div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
						<div className="h-4 bg-neutral-200 rounded w-5/6 mb-4"></div>
						<div className="flex items-center gap-2 text-sm text-neutral-500">
							<div className="w-4 h-4 bg-neutral-200 rounded"></div>{" "}
							<div className="h-4 bg-neutral-200 rounded w-20"></div>{" "}
						</div>
					</div>
					<div className="ml-4 flex-shrink-0">
						<div className="w-28 h-8 bg-neutral-200 rounded"></div>{" "}
					</div>
				</div>
			))}
		</div>
	);
}

function ReportCard({ report }: { report: IReport }) {
	const { attributes } = report || {};
	return (
		<div className="flex items-start justify-between">
			<div className="flex-1">
				<div className="flex items-center mb-2">
					<FaFileAlt size={20} className="text-primary-600 mr-2" />
					<h3 className="text-xl font-bold mb-0">{attributes.title}</h3>
				</div>

				<p className="text-neutral-600 mb-4">{attributes.description}</p>

				<div className="flex flex-wrap gap-4 text-sm text-neutral-500">
					<div className="flex items-center">
						<FaCalendarAlt size={16} className="mr-1" />
						{attributes.reportDate}
					</div>
				</div>
			</div>

			<a href={attributes.link} target="_blank">
				<Button
					variant="outline"
					size="sm"
					leftIcon={<TbLogout size={20} />}
					className="ml-4 flex-shrink-0"
				>
					Xem chi tiết
				</Button>
			</a>
		</div>
	);
}

export default ReportCard;
