import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IProgram } from "@/types/IHomePage";
import { formatShortDate } from "@/utils/dateTimeHelper";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function ProgramCard({ program }: { program: IProgram }) {
	const { image, category, date, location, title, description } =
		program?.attributes || {};
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
				<div className="absolute top-3 left-3 bg-primary-700 text-white text-sm font-medium px-3 py-1 rounded-full">
					{category?.data?.attributes?.name}
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

				<div className="grid grid-cols-2 gap-2 mt-2">
					<Button variant="outline" size="sm">
						<Link href={`/programs/${program.id}`}>Chi tiết</Link>
					</Button>

					<Button variant="primary" size="sm">
						<Link href={`/programs/${program.id}/register`}>Đăng ký</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
}

export default ProgramCard;
