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

export interface IJoinUsCtaSection
	extends IBaseSection<"sections.join-us-cta"> {
	buttons: IButton[];
}

export interface IDonationImpactSection
	extends IBaseSection<"sections.donation-impact"> {
	impacts: IImpact[];
}

interface IImpact {
	id: number;
	amount: string;
	impact: string;
	icon: string;
}

export interface IBankTransferSection extends IBaseSection<"ui.bank-info"> {
	bankName: string;
	accountNumber: string;
	accountHolder: string;
}

export interface ITransparency extends IBaseSection<"sections.transparency"> {
	content: string;
	button: IButton;
}

export interface IContactSection
	extends IBaseSection<"sections.contact-section"> {
	buttons: IButton[];
}
