import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IVolunteer } from "@/types/IVolunteer";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

function VolunteerCard({ volunteer }: { volunteer: IVolunteer }) {
	const { image, category, deadline, title, description, slug } =
		volunteer?.attributes || {};
	return (
		<Card className="h-full flex flex-col">
			<div className="relative h-48 w-full">
				<Image
					src={getStrapiMedia(
						image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={title}
					fill
					className="object-cover"
				/>
				<div className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-full">
					{category?.data?.attributes?.name}
				</div>
			</div>

			<div className="p-6 flex-grow flex flex-col">
				<div className="mb-3 flex items-center text-sm text-neutral-500">
					<FaCalendarAlt className="mr-1" />
					{deadline}
				</div>

				<h3 className="text-xl font-bold mb-3">{title}</h3>

				<p className="text-neutral-600 mb-4 flex-grow">{description}</p>
				<Link href={`/tinh-nguyen/${slug}`}>
					<Button
						fullWidth
						variant="primary"
						size="sm"
						rightIcon={<FaArrowRight />}
					>
						Xem chi tiết
					</Button>
				</Link>
			</div>
		</Card>
	);
}

export default VolunteerCard;
