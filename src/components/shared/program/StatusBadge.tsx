import React from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";

function StatusBadge({ status }: { status: string }) {
	const isUpcoming = status === "upcoming";
	return (
		<span
			className={`text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1
					${isUpcoming ? "bg-green-600" : "bg-neutral-500"}`}
		>
			{isUpcoming ? (
				<>
					<FaClock className="text-[10px]" />
					Sắp diễn ra
				</>
			) : (
				<>
					<FaCheckCircle className="text-[10px]" />
					Đã hoàn thành
				</>
			)}
		</span>
	);
}

export default StatusBadge;
