"use client";

import { useQueryVolunteer } from "@/apis/volunteer/getVolunteer.api";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import Link from "next/link";
import { useParams } from "next/navigation";
import Hero from "./Hero";

function VolunteerDetail() {
	const params = useParams();
	const { slug } = params || {};
	const { data } = useQueryVolunteer({ slug: String(slug) });
	if (!data?.data) {
		return null;
	}
	const { registerButton } = data?.data?.attributes || {};
	return (
		<div className="pt-24">
			<Hero data={data?.data} />

			<section className="py-16">
				<div className="container-custom">
					<div className="max-w-4xl mx-auto">
						<article className="prose prose-lg max-w-none">
							<RichText content={data?.data?.attributes?.content || ""} />
						</article>
						<div className="bg-primary-50 p-8 rounded-lg text-center mt-8">
							<h3 className="text-2xl font-bold mb-4">Sẵn sàng tham gia?</h3>
							<p className="text-lg mb-6">
								Đăng ký ngay để trở thành một phần của chương trình!
							</p>
							{/* <Button variant="primary" size="lg">
								<Link href="/volunteer/register">Đăng ký tham gia</Link>
							</Button> */}
							<Link href={registerButton?.link} target="__blank">
								<Button
									variant="secondary"
									size="lg"
									className="bg-gradient-to-r from-secondary-600 to-secondary-500"
								>
									{registerButton?.text}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default VolunteerDetail;
