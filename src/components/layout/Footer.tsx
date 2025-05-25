import Link from "next/link";
import Image from "next/image";
import {
	FaFacebook,
	FaYoutube,
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaHeart,
} from "react-icons/fa";
import { headers } from "next/headers";
import { IFooter } from "@/types/IGlobal";
import { getStrapiMedia } from "@/utils/helpers";

interface IFooterProps {
	data: IFooter;
}

export default function Footer({ data }: IFooterProps) {
	const pathname = headers().get("x-invoke-path") || "";
	const {
		aboutTitle,
		aboutDescription,
		contactPhone,
		contactEmail,
		contactLocation,
		quickLinks,
		quote,
		socialLinks,
		logo,
	} = data || {};

	const facebookUrl = socialLinks?.find(
		(link) => link.platform === "facebook"
	)?.url;
	const youtubeUrl = socialLinks?.find(
		(link) => link.platform === "youtube"
	)?.url;

	return (
		<footer className="bg-primary-800 text-white pt-16 pb-6" role="contentinfo">
			<div className="container-custom">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					{/* About */}
					<div>
						<h4 className="text-xl font-bold mb-6 flex items-center">
							<FaHeart className="mr-2 text-accent-500" aria-hidden="true" />
							{aboutTitle}
						</h4>
						<p className="mb-4 text-neutral-200">{aboutDescription}</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-xl font-bold mb-6">Liên kết nhanh</h4>
						<ul className="space-y-4">
							{quickLinks?.map((link) => (
								<li key={link.id}>
									<Link
										href={link.href}
										className="text-neutral-200 hover:text-white transition-colors flex items-center"
										aria-current={pathname === link.href ? "page" : undefined}
									>
										<span className="text-secondary-500 mr-2">›</span>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-xl font-bold mb-6">Liên hệ</h4>
						<ul className="space-y-6">
							<li className="flex items-start">
								<FaPhone className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
								<div>
									<p className="font-medium">Hotline</p>
									<a
										href={`tel:${contactPhone}`}
										className="text-neutral-200 hover:text-white"
									>
										{contactPhone}
									</a>
								</div>
							</li>
							<li className="flex items-start">
								<FaEnvelope className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
								<div>
									<p className="font-medium">Email</p>
									<a
										href={`mailto:${contactEmail}`}
										className="text-neutral-200 hover:text-white"
									>
										{contactEmail}
									</a>
								</div>
							</li>
							<li className="flex items-start">
								<FaMapMarkerAlt className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
								<div>
									<p className="font-medium">Địa điểm hoạt động</p>
									<p className="text-neutral-200">{contactLocation}</p>
								</div>
							</li>
						</ul>
					</div>

					{/* Inspirational Quote */}
					<div className="bg-primary-700/50 rounded-lg p-6">
						<div className="relative">
							{logo?.data?.attributes?.url && (
								<div className="mb-6">
									<Image
										src={getStrapiMedia(
											logo?.data?.attributes?.formats?.thumbnail?.url
										)}
										alt={logo.data.attributes.alternativeText || "Logo"}
										width={60}
										height={60}
										className="mx-auto"
										loading="lazy"
									/>
								</div>
							)}
							<blockquote className="text-center">
								<p className="text-lg font-serif italic mb-4">{quote?.text}</p>
								<footer className="text-neutral-200">— {quote?.author}</footer>
							</blockquote>
						</div>
					</div>
				</div>

				<div className="mt-12 pt-6 border-t border-primary-600">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-neutral-300 text-sm">
							© Bản quyền 2022 thuộc về CLB Thiện Nguyện Smile Gift
						</p>
						<div className="flex items-center space-x-4 mt-4 md:mt-0">
							{facebookUrl && (
								<a
									href={facebookUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-neutral-300 hover:text-white transition-colors"
									aria-label="Trang Facebook của Smile Gift"
								>
									<FaFacebook size={24} />
								</a>
							)}
							{youtubeUrl && (
								<a
									href={youtubeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-neutral-300 hover:text-white transition-colors"
									aria-label="Kênh YouTube của Smile Gift"
								>
									<FaYoutube size={24} />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
