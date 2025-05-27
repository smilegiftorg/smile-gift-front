"use client";

import React from "react";
import Hero from "./Hero";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import { useQueryArticle } from "@/apis/article/getArticle.api";
import { useParams } from "next/navigation";

function ArticleDetail() {
  const params = useParams();
  const { slug } = params || {};
  const { data } = useQueryArticle({ slug: String(slug) });
  
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

export default ArticleDetail;