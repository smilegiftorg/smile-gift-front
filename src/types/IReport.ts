export interface IReport {
	id: number;
	attributes: {
		title: string;
		description: string;
		reportDate: string;
		link: string;
	};
}
