"use client";

import React from "react";
import Hero from "./Hero";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import { useQueryProgram } from "@/apis/program/getProgram.api";
import { useParams } from "next/navigation";

function ProgramDetail() {
	const params = useParams();
	const { slug } = params || {};
	const { data } = useQueryProgram({ slug: String(slug) });
	if (!data?.data) {
		return null;
	}
	return (
		<div className="pt-24 pb-16">
			<Hero data={data?.data} />
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<MainContent data={data?.data} />
					<Sidebar data={data?.data} />
				</div>
			</div>
		</div>
	);
}

export default ProgramDetail;
