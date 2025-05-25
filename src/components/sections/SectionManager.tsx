import React from "react";
import dynamic from "next/dynamic";
import {
	IAboutPreviewSection,
	IFeaturedProgramsSection,
	IGalleryPreviewSection,
	IHeroSection,
	IImpactStatsSection,
	INewsPreviewSection,
	ITestimonialsSection,
	IVolunteerCTASection,
} from "@/types/IHomePage";
import GalleryPreview from "./GalleryPreview";
import TestimonialsSection from "./TestimonialsSection";
import NewsPreview from "./NewsPreview";
import VolunteerCTA from "./VolunteerCTA";
import DonationSection from "./DonationSection";
import {
	IHeaderSection,
	IMissionAndValuesSection,
	IOurStorySection,
	ITeamSection,
} from "@/types/IPageData";
import Header from "./Header";
import OurStory from "./OurStory";
import MissionAndValues from "./MissionAndValues";
import Team from "./TeamSection";
import TeamSection from "./TeamSection";

const Hero = dynamic(() => import("./Hero"), { ssr: true });
const AboutPreview = dynamic(() => import("./AboutPreview"), { ssr: true });
const ImpactStats = dynamic(() => import("./ImpactStats"), { ssr: true });
const FeaturedPrograms = dynamic(() => import("./FeaturedPrograms"), {
	ssr: true,
});

type SectionType =
	| IHeroSection
	| IAboutPreviewSection
	| IImpactStatsSection
	| IFeaturedProgramsSection
	| IGalleryPreviewSection
	| ITestimonialsSection
	| INewsPreviewSection
	| IVolunteerCTASection
	| IHeaderSection
	| IOurStorySection
	| IMissionAndValuesSection
	| ITeamSection;

const SectionManager = ({ sections }: { sections: SectionType[] }) => {
	return (
		<>
			{sections.map((section, index) => {
				switch (section.__component) {
					case "sections.hero":
						const heroSection = section as IHeroSection;
						return (
							<div key={`index-${index}`}>
								<Hero {...heroSection} />
							</div>
						);

					case "sections.about-preview":
						const aboutPreviewSection = section as IAboutPreviewSection;
						return (
							<div key={`index-${index}`}>
								<AboutPreview {...aboutPreviewSection} />
							</div>
						);
					case "sections.impact-stats":
						const impactStatsSection = section as IImpactStatsSection;
						return (
							<div key={`index-${index}`}>
								<ImpactStats {...impactStatsSection} />
							</div>
						);
					case "sections.featured-programs":
						const featuredProgramsSection = section as IFeaturedProgramsSection;
						console.log("featuredProgramsSection: ", featuredProgramsSection);
						return (
							<div key={`index-${index}`}>
								<FeaturedPrograms {...featuredProgramsSection} />
							</div>
						);

					case "sections.gallery-preview":
						const galleryPreviewSection = section as IGalleryPreviewSection;
						return (
							<div key={`index-${index}`}>
								<GalleryPreview {...galleryPreviewSection} />
							</div>
						);

					case "sections.testimonial":
						const testimonialsSection = section as ITestimonialsSection;
						return (
							<div key={`index-${index}`}>
								<TestimonialsSection {...testimonialsSection} />
							</div>
						);

					case "sections.news-preview":
						const newsPreviewSection = section as INewsPreviewSection;
						return (
							<div key={`index-${index}`}>
								<NewsPreview {...newsPreviewSection} />
							</div>
						);
					case "sections.header":
						const headerSection = section as IHeaderSection;
						return (
							<div key={`index-${index}`}>
								<Header {...headerSection} />
							</div>
						);
					case "sections.our-story":
						const ourStorySection = section as IOurStorySection;
						return (
							<div key={`index-${index}`}>
								<OurStory {...ourStorySection} />
							</div>
						);
					case "sections.mission-and-values":
						const missionAndValuesSection = section as IMissionAndValuesSection;
						return (
							<div key={`index-${index}`}>
								<MissionAndValues {...missionAndValuesSection} />
							</div>
						);
					case "sections.team":
						const teamSection = section as ITeamSection;
						return (
							<div key={`index-${index}`}>
								<TeamSection {...teamSection} />
							</div>
						);
					default:
						return null;
				}
			})}
		</>
	);
};

export default SectionManager;
