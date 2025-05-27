export interface IButton {
	id: number;
	text: string;
	link: string;
	variant: "secondary" | "outline";
	icon: string;
}

export interface IImageAttributes {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large?: IImageFormat;
		medium?: IImageFormat;
		small?: IImageFormat;
		thumbnail?: IImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: IProviderMetadata | null;
	createdAt: string;
	updatedAt: string;
}

export interface IImageData {
	id: number;
	attributes: IImageAttributes;
}

export interface IImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
	provider_metadata?: IProviderMetadata;
}

export interface IProviderMetadata {
	public_id: string;
	resource_type: string;
}

export interface ICategory {
	id: number;
	attributes: {
		name: string;
		slug: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
	};
}

export interface IBaseSection<T> {
	id: number;
	__component: T;
	subtitle: string;
	title: string;
	description: string;
	viewAllButton: IButton;
}

export interface IPageProps {
	params: { slug: string[] };
}

export interface IDataResponse<T> {
	data: T;
	meta: {
		pagination: IPagination;
	};
}

interface IPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface ISeo {
	id: number;
	metaTitle: string;
	metaDescription: string;
	keywords: null;
	metaRobots: null;
	structuredData: null;
	metaViewport: null;
	canonicalURL: null;
	metaSocial: MetaSocial[];
	metaImage: {
		data: IImageData;
	};
}

interface MetaSocial {
	id: number;
	socialNetwork: string;
	title: string;
	description: string;
	image: {
		data: IImageData;
	};
}
