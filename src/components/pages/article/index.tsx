"use client";

import { useQueryArticle } from "@/apis/article/getArticle.api";
import { useParams } from "next/navigation";
import React from "react";
import Hero from "./Hero";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function ArticleDetail() {
	const params = useParams();
	const { slug } = params || {};
	const { data } = useQueryArticle({ slug: String(slug) });
	if (!data?.data) {
		return null;
	}
	return (
		<div className="pt-24">
			<Hero data={data.data} />

			<section className="py-16">
				<div className="container-custom">
					<div className="grid grid-cols-12 gap-8">
						<MainContent data={data?.data} />

						<Sidebar data={data.data} />
					</div>
				</div>
			</section>
		</div>
	);
}

export default ArticleDetail;
