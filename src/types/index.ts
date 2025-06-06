export interface IProgram {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  status: 'upcoming' | 'completed';
  category: string;
  slug: string;
  maxAttendees?: number;
  volunteersParticipated?: number;
  beneficiaries?: number;
}

export interface IArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  author: string;
  category: string;
  slug: string;
}

export interface IVolunteer {
  id: number;
  title: string;
  description: string;
  image: string;
  deadline: string;
  location: string;
  positions: number;
  category: string;
  slug: string;
}

export interface IReport {
  id: number;
  title: string;
  description: string;
  reportDate: string;
  link: string;
  type: 'quarterly' | 'annual';
}