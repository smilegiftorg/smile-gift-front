import React from "react";
import Image from "next/image";
import { ITeamSection } from "@/types/IPageData";
import { getStrapiMedia } from "@/utils/helpers";

function TeamSection(props: ITeamSection) {
	const { title, description, members } = props;
	return (
		<section className="py-16">
			<div className="container-custom">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						{title || "Đội ngũ của chúng tôi"}
					</h2>
					<p className="text-lg text-neutral-600 max-w-3xl mx-auto">
						{description}
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{members?.map((member, index) => {
						const { name, image, role, facebookUrl, email } = member || {};
						return (
							<div
								key={index}
								className="bg-white rounded-lg overflow-hidden shadow-md"
							>
								<div className="relative h-64 w-full">
									<Image
										src={getStrapiMedia(
											image?.data?.attributes?.formats?.small?.url || ""
										)}
										alt={name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-6 text-center">
									<h3 className="text-xl font-bold mb-1">{name}</h3>
									<p className="text-primary-600 mb-4">{role}</p>
									<div className="flex justify-center space-x-4">
										<a
											href={facebookUrl}
											target="_blank"
											className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
										>
											<span className="sr-only">Facebook</span>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
													clipRule="evenodd"
												/>
											</svg>
										</a>
										<a
											href={`mailto:${email}`}
											type="email"
											className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
										>
											<span className="sr-only">Email</span>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default TeamSection;
