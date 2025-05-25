import { useQueryCategories } from "@/apis/category/getCategories.api";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IProgram } from "@/types/IHomePage";
import { formatShortDate } from "@/utils/dateTimeHelper";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import {
	FaCalendarAlt,
	FaCheckCircle,
	FaClock,
	FaMapMarkerAlt,
} from "react-icons/fa";

function ProgramCard({ program }: { program: IProgram }) {
	const { image, category, date, location, title, description, status } =
		program?.attributes || {};
	const isUpcoming = status === "upcoming";
	const isCompleted = status === "completed";

	return (
		<Card key={program.id} className="h-full flex flex-col">
			<div className="relative h-48 w-full">
				<Image
					src={getStrapiMedia(
						image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={program.attributes.title}
					fill
					className="object-cover"
				/>
				<div className="absolute top-3 left-3 flex gap-2">
					<span className="bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-full">
						{category?.data?.attributes?.name}
					</span>
					<span
						className={`text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1
					${isUpcoming ? "bg-green-600" : "bg-blue-600"}`}
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
				</div>
			</div>

			<div className="p-6 flex-grow flex flex-col">
				<div className="mb-3 flex items-center text-sm text-neutral-500">
					<FaCalendarAlt className="mr-1" />
					<span className="mr-3">{date}</span>
					<FaMapMarkerAlt className="mr-1" />
					<span>{location}</span>
				</div>

				<h3 className="text-xl font-bold mb-3">{title}</h3>

				<p className="text-neutral-600 mb-4 flex-grow">{description}</p>

				{isUpcoming ? (
					<div className="grid grid-cols-2 gap-2 mt-2">
						<Button variant="outline" size="sm">
							<Link href={`/programs/${program.id}`}>Chi tiết</Link>
						</Button>

						<Button variant="primary" size="sm">
							<Link href={`/programs/${program.id}/register`}>Đăng ký</Link>
						</Button>
					</div>
				) : (
					<div className="mt-4 pt-4 border-t border-neutral-100">
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">10</div>
								<div className="text-sm text-neutral-500">TNV tham gia</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">20</div>
								<div className="text-sm text-neutral-500">Người thụ hưởng</div>
							</div>
						</div>
						<Button variant="outline" size="sm" fullWidth>
							<Link href={`/programs/${program.id}`}>Xem kết quả</Link>
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
}

export default ProgramCard;
