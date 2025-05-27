import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { IJoinUsCtaSection } from "@/types/IPageData";

function JoinUsCta(props: IJoinUsCtaSection) {
	const { title, description, buttons } = props;
	return (
		<section className="py-16 bg-primary-700 text-white">
			<div className="container-custom text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
					{title || "Tham gia cùng chúng tôi để tạo ra sự khác biệt!"}
				</h2>
				<p className="text-lg mb-8 text-neutral-200 max-w-2xl mx-auto">
					{description}
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					{buttons?.map((button, index) => {
						const { id, variant, link, text } = button || {};
						const className =
							variant === "outline"
								? "border-white text-white hover:bg-white/10"
								: "";
						return (
							<Button
								key={`${id} - ${index}`}
								variant={variant}
								size="lg"
								className={className}
							>
								<Link href={link}>{text}</Link>
							</Button>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default JoinUsCta;
