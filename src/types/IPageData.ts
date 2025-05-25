import { IBaseSection, IButton, ICategory, IImageData } from "./ICommon";

export interface IPageData {
	data: {
		id: number;
		attributes: {
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			sections: Section[];
		};
	};
}

type Section = IHeaderSection;

export interface IHeaderSection extends IBaseSection<"sections.header"> {
	backgroundImage: {
		data: IImageData;
	};
}

export interface IOurStorySection extends IBaseSection<"sections.our-story"> {
	content: string;
	highlightBox: IQuoteBox;
	quoteBox: IQuoteBox;
	mainImage: {
		data: IImageData;
	};
}

interface IQuoteBox {
	id: number;
	title: null;
	quote: string;
	attribution: string;
}

export interface IMissionAndValuesSection
	extends IBaseSection<"sections.mission-and-values"> {
	missionItems: IMissionItem[];
	coreValues: ICoreValue[];
	button: IButton;
}

interface IMissionItem {
	id: number;
	icon: string;
	text: string;
}
interface ICoreValue {
	id: number;
	icon: string;
	title: string;
	description: string;
}

export interface ITeamSection extends IBaseSection<"sections.team"> {
	members: ITeamMember[];
}

interface ITeamMember {
	id: number;
	name: string;
	role: string;
	facebookUrl: string;
	email: string;
	image: {
		data: IImageData;
	};
}
