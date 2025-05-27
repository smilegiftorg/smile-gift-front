"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { IProgram } from "@/types/IProgram";
import { getStrapiMedia } from "@/utils/helpers";
import { Calendar, Info, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ISidebarProps {
	data: IProgram;
}
function Sidebar(props: ISidebarProps) {
	const { data } = props || {};
	const program = data?.attributes || {};
	const programId = data?.id;
	const results = program.sections?.find(
		(item) => item.__component === "program.results"
	);
	const relatedPrograms = program?.relatedPrograms?.data || [];
	return (
		<div className="lg:col-span-1">
			{program.status === "upcoming" ? (
				<div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8">
					<div className="flex items-center mb-6">
						<Info className="h-5 w-5 text-primary-700 mr-2" />
						<h2 className="text-xl font-bold mb-0">Thông tin chương trình</h2>
					</div>

					<div className="space-y-4 mb-6">
						<div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
							<div className="flex items-center">
								<Calendar className="h-5 w-5 text-primary-600 mr-2" />
								<span className="text-neutral-600">Thời gian:</span>
							</div>
							<span className="font-medium">{program.date}</span>
						</div>

						<div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
							<div className="flex items-center">
								<MapPin className="h-5 w-5 text-primary-600 mr-2" />
								<span className="text-neutral-600">Địa điểm:</span>
							</div>
							<span className="font-medium">{program.location}</span>
						</div>

						<div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
							<div className="flex items-center">
								<Users className="h-5 w-5 text-primary-600 mr-2" />
								<span className="text-neutral-600">Số lượng:</span>
							</div>
							<span className="font-medium">
								{program.maxAttendees || 0} người
							</span>
						</div>
					</div>

					<Button
						variant="primary"
						size="lg"
						fullWidth
						className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
					>
						<Link href={`/programs/${programId}/register`}>
							Đăng ký tham gia ngay
						</Link>
					</Button>
				</div>
			) : (
				<div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-8">
					<h2 className="text-xl font-bold mb-6 flex items-center">
						<Info className="h-5 w-5 text-primary-700 mr-2" />
						Kết quả đạt được
					</h2>
					<div className="space-y-4">
						{results && (
							<>
								<div className="p-4 bg-neutral-50 rounded-lg">
									<div className="text-sm text-neutral-500 mb-1">
										Tình nguyện viên
									</div>
									<div className="text-2xl font-bold text-primary-700">
										{results.volunteersParticipated}
										<span className="text-base font-normal ml-1">người</span>
									</div>
								</div>

								<div className="p-4 bg-neutral-50 rounded-lg">
									<div className="text-sm text-neutral-500 mb-1">
										Người được hỗ trợ
									</div>
									<div className="text-2xl font-bold text-primary-700">
										{results.beneficiaries || 0}
										<span className="text-base font-normal ml-1">người</span>
									</div>
								</div>

								{results.fundsRaised && (
									<div className="p-4 bg-neutral-50 rounded-lg">
										<div className="text-sm text-neutral-500 mb-1">
											Số tiền gây quỹ
										</div>
										<div className="text-2xl font-bold text-primary-700">
											{results.fundsRaised}
										</div>
									</div>
								)}

								{results.giftsDistributed && (
									<div className="p-4 bg-neutral-50 rounded-lg">
										<div className="text-sm text-neutral-500 mb-1">
											Quà đã phát
										</div>
										<div className="text-2xl font-bold text-primary-700">
											{results.giftsDistributed}
											<span className="text-base font-normal ml-1">phần</span>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			)}

			{/* Related Programs */}
			{relatedPrograms.length > 0 && (
				<div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
					<div className="p-6 border-b">
						<h2 className="text-xl font-bold">Chương trình liên quan</h2>
					</div>

					<div className="divide-y">
						{relatedPrograms.map((relatedProgram) => {
							const { image, title, date, slug } =
								relatedProgram?.attributes || {};

							return (
								<Link key={slug} href={`/programs/${slug}`}>
									<Card
										className="hover:bg-neutral-50 transition-colors border-none shadow-none rounded-none"
										hoverEffect={false}
									>
										<div className="p-4">
											<div className="flex gap-4">
												<div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
													<Image
														src={getStrapiMedia(
															image?.data?.attributes?.formats?.thumbnail
																?.url || ""
														)}
														alt={title}
														fill
														className="object-cover"
													/>
												</div>
												<div>
													<h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors text-base">
														{title}
													</h3>
													<div className="flex items-center text-sm text-neutral-500">
														<Calendar className="h-3 w-3 mr-1" />
														{date}
													</div>
												</div>
											</div>
										</div>
									</Card>
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default Sidebar;
