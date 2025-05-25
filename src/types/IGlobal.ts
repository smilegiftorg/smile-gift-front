interface INavItem {
	id: number;
	name: string;
	nameEn: string;
	path: string;
}

interface ILogo {
	data: {
		id: number;
		attributes: Record<string, any>;
	};
}

export interface IHeader {
	id: number;
	title: string;
	subtitle: string;
	contactLabel: string;
	contactPath: string;
	logo: ILogo;
	navItems: INavItem[];
}

export interface IFooter {
	id: number;
	aboutTitle: string;
	aboutDescription: string;
	contactPhone: string;
	contactEmail: string;
	contactLocation: string;
	quickLinks: {
		id: number;
		label: string;
		href: string;
	}[];
	quote: {
		id: number;
		text: string;
		author: string;
	};
	socialLinks: {
		id: number;
		platform: string;
		url: string;
	}[];
	logo: {
		data: {
			id: number;
			attributes: Record<string, any>;
		};
	};
}
