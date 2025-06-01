import React from "react";
import Button from "./Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface INoDataProps {
	title: string;
	subtitle: string;
	buttonLink: string;
}
function NoData(props: INoDataProps) {
	const { title, subtitle, buttonLink } = props;
	return (
		<div className="pt-24 min-h-screen bg-neutral-50">
			<div className="container-custom py-16 text-center">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				<p className="mb-8">{subtitle}</p>
				<Button variant="primary">
					<Link href={buttonLink} className="flex items-center">
						<FaArrowLeft className="mr-2" />
						<span>Quay lại danh sách</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default NoData;
