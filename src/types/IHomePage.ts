import { IBaseSection, IButton, ICategory, IImageData, ISeo } from "./ICommon";
import { IProgram } from "./IProgram";

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

type Section = IHeroSection | IAboutPreviewSection;

export interface IHeroSection extends IBaseSection<"sections.hero"> {
	backgroundImage: {
		data: IImageData;
	};
	buttons: IButton[];
}

export interface IAboutPreviewSection
	extends IBaseSection<"sections.about-preview"> {
	quote: string;
	image: {
		data: IImageData;
	};
	coreValue: ICoreValueGroup;
	stat: IStatGroup;
	button: IButton;
}

export interface ICoreValueGroup {
	id: number;
	title: string;
	items: ICoreValue[];
}

export interface ICoreValue {
	id: number;
	value: string;
}

export interface IStatGroup {
	id: number;
	title: string;
	items: IStat[];
}

export interface IStat {
	id: number;
	value: string;
	description: string;
}

export interface IImpactStat {
	id: number;
	value: string;
	description: string;
	icon: string;
	unit: string;
}

export interface IImpactStatsSection
	extends IBaseSection<"sections.impact-stats"> {
	stats: IImpactStat[];
}

export interface IFeaturedProgramsSection
	extends IBaseSection<"sections.featured-programs"> {
	viewAllButton: IButton;
	programs: IPrograms;
}

export interface IPrograms {
	data: IProgram[];
}

export interface IGalleryPreviewSection
	extends IBaseSection<"sections.gallery-preview"> {
	galleryItems: IGalleryItems;
}

export interface IGalleryItems {
	data: IGalleryItem[];
}

export interface IGalleryItem {
	id: number;
	attributes: {
		title: string;
		date: string;
		createdAt: string;
		updatedAt: string;
		image: {
			data: IImageData;
		};
	};
}

export interface ITestimonialsSection
	extends IBaseSection<"sections.testimonial"> {
	testimonials: ITestimonials;
}

interface ITestimonials {
	data: ITestimonial[];
}

interface ITestimonial {
	id: number;
	attributes: {
		name: string;
		role: string;
		avatar: {
			data: IImageData;
		};
		content: string;
		image: {
			data: IImageData;
		};
	};
}

export interface INewsPreviewSection
	extends IBaseSection<"sections.news-preview"> {
	newsItems: IArticles;
}

interface IArticles {
	data: IArticle[];
}

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
	};
}
interface IBenefit {
	text: string;
}

interface IRole {
	id: number;
	attributes: {
		icon: string;
		title: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	};
}
export interface IVolunteerCTASection
	extends IBaseSection<"sections.volunteer-cta"> {
	benefits: IBenefit[];
	roles: {
		data: IRole[];
	};
	button: IButton;
}

export interface ISponsoredItem {
	label: string;
}
export interface IDonationSection extends IBaseSection<"sections.donation"> {
	buttons: IButton[];
	sponsoredItems: ISponsoredItem[];
	bankInfo: IBankInfo;
}

export interface IBankInfo {
	bankName: string;
	accountNumber: string;
	accountHolder: string;
}
