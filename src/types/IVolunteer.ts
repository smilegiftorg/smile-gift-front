import { IButton, ICategory, IImageData, ISeo } from "./ICommon";

export interface IVolunteer {
	id: number;
	attributes: {
		image: {
			data: IImageData;
		};
		category: {
			data: ICategory;
		};
		title: string;
		deadline: string;
		slug: string;
		location: string;
		description: string;
		content: string;
		seo: ISeo;
		postions: number;
		registerButton: IButton;
	};
}
