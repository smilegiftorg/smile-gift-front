"use client";

import ShareButtons from "@/components/sections/ShareButtons";
import StatusBadge from "@/components/shared/program/StatusBadge";
import Button from "@/components/ui/Button";
import { IProgram } from "@/types/IProgram";
import { getStrapiMedia } from "@/utils/helpers";
import {
	ArrowLeft,
	Calendar,
	Clock,
	MapPin,
	Share2,
	Tag,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IHeroProps {
	data: IProgram;
}
function Hero({ data }: IHeroProps) {
	const program = data?.attributes || {};
	const programId = data?.id;
	const [showShareOptions, setShowShareOptions] = useState(false);
	if (!program) {
		return null;
	}

	const results = program.sections?.find(
		(item) => item.__component === "program.results"
	);
	return (
		<div className="relative bg-black text-white">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						program.image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={program.title}
					fill
					style={{ objectFit: "cover" }}
					className="opacity-40"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
			</div>

			<div className="container relative z-10 pt-16 pb-12 md:pt-24 md:pb-20 px-4 mx-auto">
				<Link
					href="/programs"
					className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors group"
				>
					<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
					Trở lại danh sách chương trình
				</Link>

				<div className="max-w-4xl">
					<div className="flex flex-wrap gap-3 mb-6">
						<span className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
							<Tag className="h-4 w-4 mr-1.5" />
							{program.category?.data?.attributes?.name || "Chưa có danh mục"}
						</span>

						<StatusBadge status={program.status} />
					</div>

					<h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
						{program.title}
					</h1>

					<div className="flex flex-wrap gap-6 text-white/90 mb-8">
						<div className="flex items-center">
							<Calendar className="h-5 w-5 mr-2" />
							<span>{program.date}</span>
						</div>

						<div className="flex items-center">
							<MapPin className="h-5 w-5 mr-2" />
							<span>{program.location}</span>
						</div>

						<div className="flex items-center">
							<Users className="h-5 w-5 mr-2" />
							<span>
								{program.status === "upcoming"
									? `${program.maxAttendees} người tham gia`
									: results?.beneficiaries || 0 + " người được hỗ trợ"}
							</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-4">
						{program.status === "upcoming" && (
							<Button
								variant="primary"
								size="lg"
								className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
							>
								<Link href={`/programs/${programId}/register`}>
									Đăng ký tham gia ngay
								</Link>
							</Button>
						)}

						<div className="relative">
							<Button
								variant="outline"
								size="lg"
								className="border-white text-white hover:bg-white/10"
								onClick={() => setShowShareOptions(!showShareOptions)}
							>
								<Share2 className="mr-2 h-4 w-4" />
								Chia sẻ
							</Button>

							{showShareOptions && (
								<div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg p-4 min-w-[300px] z-50">
									<ShareButtons program={program} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
