import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { ITransparency } from "@/types/IPageData";
import RichText from "../ui/RichText";

function Transparency(props: ITransparency) {
	const { button, content } = props || {};
	return (
		<section className="py-16">
			<div className="container-custom">
				<div className="max-w-3xl mx-auto">
					<article className="prose prose-lg max-w-none">
						<RichText content={content || ""} />
					</article>

					<div className="text-center mt-8">
						<Button variant={button?.variant}>
							<Link href={button?.link || "/"}>{button?.text}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Transparency;
