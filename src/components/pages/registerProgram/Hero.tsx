import { IProgram } from "@/types/IProgram";
import { getStrapiMedia } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface IHeroProps {
	data: IProgram;
}

function Hero({ data }: IHeroProps) {
	const program = data?.attributes || {};
	const { image, title, slug } = program || {};
	return (
		<div className="relative bg-black text-white py-12">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={getStrapiMedia(
						image?.data?.attributes?.formats?.medium?.url || ""
					)}
					alt={title}
					fill
					style={{ objectFit: "cover" }}
					className="opacity-40"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
			</div>

			<div className="container relative z-10 px-4 mx-auto">
				<Link
					href={`/du-an/${slug}`}
					className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
				>
					<FaArrowLeft className="mr-2 h-4 w-4" />
					Quay lại chi tiết chương trình
				</Link>

				<h1 className="text-3xl font-bold mb-2">Đăng ký tham gia</h1>
				<p className="text-xl text-white/90">{title}</p>
			</div>
		</div>
	);
}

export default Hero;
