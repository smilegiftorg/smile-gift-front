"use client";

import { IArticle } from "@/types/IArticle";
import Description from "@/components/ui/Description";

interface IMainContentProps {
  data: IArticle;
}

function MainContent(props: IMainContentProps) {
  const { data } = props;
  const article = data?.attributes || {};

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-6">
          <div>
            <div className="prose max-w-none">
              <Description description={article.longDescription} classes="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;