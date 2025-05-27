import StatusBadge from "@/components/shared/program/StatusBadge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IProgram } from "@/types/IProgram";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function ProgramCard({ program }: { program: IProgram }) {
	const {
		image,
		category,
		date,
		location,
		title,
		description,
		status,
		slug,
		sections,
	} = program?.attributes || {};
	const isUpcoming = status === "upcoming";
	const results = sections?.find(
		(item) => item.__component === "program.results"
	);
	return (
		<Card className="h-full flex flex-col">
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
					<StatusBadge status={status} />
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
						<Link href={`/programs/${slug}`}>
							<Button variant="outline" size="sm" fullWidth>
								Chi tiết
							</Button>
						</Link>
						<Link href={`/programs/${program.id}/register`}>
							<Button variant="primary" size="sm" fullWidth className="h-full">
								Đăng ký
							</Button>
						</Link>
					</div>
				) : (
					<div className="mt-4 pt-4 border-t border-neutral-100">
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">
									{results?.volunteersParticipated || 0}
								</div>
								<div className="text-sm text-neutral-500">TNV tham gia</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary-600">
									{results?.beneficiaries || 0}
								</div>
								<div className="text-sm text-neutral-500">Người thụ hưởng</div>
							</div>
						</div>
						<Link href={`/programs/${slug}`}>
							<Button variant="outline" size="sm" fullWidth>
								Xem kết quả
							</Button>
						</Link>
					</div>
				)}
			</div>
		</Card>
	);
}

export default ProgramCard;
