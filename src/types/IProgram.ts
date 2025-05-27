import { ICategory, IImageData, ISeo } from "./ICommon";

export interface IProgram {
	id: number;
	attributes: {
		image: {
			data: IImageData;
		};
		category: {
			data: ICategory;
		};
		title: string;
		status: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		slug: string;
		date: string;
		location: string;
		description: string;
		priority: number;
		maxAttendees: number;
		longDescription: string;
		locale: string;
		gallery: Gallery;
		sections: Section[];
		seo: ISeo;
	};
}

interface Section {
	id: number;
	__component: string;
	schedules: Schedule[];
	volunteersParticipated?: number;
	beneficiaries?: number;
	fundsRaised?: string;
	giftsDistributed?: number;
	mealsServed?: number;
	scholarshipsAwarded?: number;
	scholarshipAmount?: string;
	attendees?: number;
}

interface Schedule {
	id: number;
	time: string;
	activity: string;
}

interface Gallery {
	data: IImageData[];
}
