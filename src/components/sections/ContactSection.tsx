import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { IContactSection } from "@/types/IPageData";

function ContactSection(props: IContactSection) {
	const { title, subtitle, buttons } = props || {};
	return (
		<section className="py-16 bg-neutral-50">
			<div className="container-custom">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6">{title}</h2>
					<p className="text-lg mb-8">{subtitle}</p>

					<div className="flex flex-col sm:flex-row justify-center gap-4">
						{buttons?.map((item) => {
							const { text, link, variant } = item || {};
							return (
								<Link href={link}>
									<Button className="h-full" variant={variant}>
										{text}
									</Button>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContactSection;
