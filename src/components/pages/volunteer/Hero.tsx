"use client";

import Button from "@/components/ui/Button";
import { IVolunteer } from "@/types/IVolunteer";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import {
	FaArrowLeft,
	FaCalendarAlt,
	FaMapMarkerAlt,
	FaUsers,
} from "react-icons/fa";

interface IHeroProps {
	data: IVolunteer;
}
function Hero(props: IHeroProps) {
	const { data } = props || {};
	const volunteer = data?.attributes;
	return (
		<div className="relative bg-primary-800 text-white py-16">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						volunteer.image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={volunteer.title}
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					className="opacity-20"
				/>
			</div>
			<div className="container-custom relative z-10">
				<Link
					href="/volunteer"
					className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors"
				>
					<FaArrowLeft className="mr-2" />
					Quay lại danh sách
				</Link>

				<div className="max-w-3xl">
					<div className="flex flex-wrap gap-3 mb-6">
						<span className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
							{volunteer.category?.data?.attributes?.name}
						</span>
						<span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
							Đang tuyển
						</span>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						{volunteer.title}
					</h1>

					<div className="flex flex-wrap gap-6 text-white/90 mb-8">
						<div className="flex items-center">
							<FaCalendarAlt className="mr-2" />
							<span>Hạn đăng ký: {volunteer.deadline}</span>
						</div>
						<div className="flex items-center">
							<FaMapMarkerAlt className="mr-2" />
							<span>{volunteer.location}</span>
						</div>
						<div className="flex items-center">
							<FaUsers className="mr-2" />
							<span>Cần {volunteer.postions} TNV</span>
						</div>
					</div>

					<p className="text-xl mb-8 text-white/90">{volunteer.description}</p>

					<Button
						variant="secondary"
						size="lg"
						className="bg-gradient-to-r from-secondary-600 to-secondary-500"
					>
						<Link href="/volunteer/register">Đăng ký ngay</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Hero;
