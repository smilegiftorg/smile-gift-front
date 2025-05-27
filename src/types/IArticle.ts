import { ICategory, IImageData } from "./ICommon";

export interface IArticle {
	id: number;
	attributes: {
		title: string;
		slug: string;
		publishedAt: string;
		image: {
			data: IImageData;
		};
		category: {
			data: ICategory;
		};
		description: string;
		author: string;
		longDescription: string;
		relatedArticles: {
			data: IArticle[];
		};
	};
}
