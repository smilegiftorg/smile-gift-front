"use client";

import Card from "@/components/ui/Card";
import { IArticle } from "@/types/IArticle";
import { getStrapiMedia } from "@/utils/helpers";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ISidebarProps {
  data: IArticle;
}

function Sidebar(props: ISidebarProps) {
  const { data } = props || {};
  const article = data?.attributes || {};
  const relatedArticles = article?.relatedArticles?.data || [];

  return (
    <div className="lg:col-span-1">
      {relatedArticles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Bài viết liên quan</h2>
          </div>

          <div className="divide-y">
            {relatedArticles.map((relatedArticle) => {
              const { image, title, publishedAt, slug } =
                relatedArticle?.attributes || {};

              return (
                <Link key={slug} href={`/news/${slug}`}>
                  <Card
                    className="hover:bg-neutral-50 transition-colors border-none shadow-none rounded-none"
                    hoverEffect={false}
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={getStrapiMedia(
                              image?.data?.attributes?.formats?.thumbnail?.url || ""
                            )}
                            alt={title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors text-base">
                            {title}
                          </h3>
                          <div className="flex items-center text-sm text-neutral-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {publishedAt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;