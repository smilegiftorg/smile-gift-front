"use client";

import React from "react";
import Hero from "./Hero";
import RegisterForm from "./RegisterForm";
import { useParams } from "next/navigation";
import { useQueryProgram } from "@/apis/program/getProgram.api";

function RegisterProgram() {
	const params = useParams();
	const { slug } = params || {};
	const { data } = useQueryProgram({ slug: String(slug) });
	if (!data?.data) {
		return null;
	}
	return (
		<div className="pt-24">
			<Hero data={data?.data} />
			<div className="container mx-auto px-4 py-12">
				<RegisterForm />
			</div>
		</div>
	);
}

export default RegisterProgram;
