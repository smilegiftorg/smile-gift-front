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
import {
	IBankTransferSection,
	IContactSection,
	IDonationImpactSection,
	IHeaderSection,
	IJoinUsCtaSection,
	IMissionAndValuesSection,
	IOurStorySection,
	ITeamSection,
	ITransparency,
} from "@/types/IPageData";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"), { ssr: true });
const AboutPreview = dynamic(() => import("./AboutPreview"), { ssr: true });
const ImpactStats = dynamic(() => import("./ImpactStats"), { ssr: true });
const FeaturedPrograms = dynamic(() => import("./FeaturedPrograms"), {
	ssr: true,
});
const DonationImpacts = dynamic(() => import("./DonationImpacts"), {
	ssr: true,
});
const GalleryPreview = dynamic(() => import("./GalleryPreview"), { ssr: true });
const Header = dynamic(() => import("./Header"), { ssr: true });
const JoinUsCta = dynamic(() => import("./JoinUsCta"), { ssr: true });
const MissionAndValues = dynamic(() => import("./MissionAndValues"), {
	ssr: true,
});
const NewsPreview = dynamic(() => import("./NewsPreview"), { ssr: true });
const OurStory = dynamic(() => import("./OurStory"), { ssr: true });
const TeamSection = dynamic(() => import("./TeamSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
	ssr: true,
});
const BankTransfer = dynamic(() => import("./BankTransfer"), { ssr: true });
const Transparency = dynamic(() => import("./Transparency"), { ssr: true });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: true });

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
	| ITeamSection
	| IJoinUsCtaSection
	| IDonationImpactSection
	| IBankTransferSection
	| ITransparency
	| IContactSection;

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
					case "sections.join-us-cta":
						const joinUsCtaSection = section as IJoinUsCtaSection;
						return (
							<div key={`index-${index}`}>
								<JoinUsCta {...joinUsCtaSection} />
							</div>
						);
					case "sections.donation-impact":
						const donationImpactSection = section as IDonationImpactSection;
						return (
							<div key={`index-${index}`}>
								<DonationImpacts {...donationImpactSection} />
							</div>
						);
					case "ui.bank-info":
						const bankTransferSection = section as IBankTransferSection;
						return (
							<div key={`index-${index}`}>
								<BankTransfer {...bankTransferSection} />
							</div>
						);
					case "sections.transparency":
						const transparency = section as ITransparency;
						return (
							<div key={`index-${index}`}>
								<Transparency {...transparency} />
							</div>
						);
					// case "sections.contact-section":
					// 	const contactSection = section as IContactSection;
					// 	return (
					// 		<div key={`index-${index}`}>
					// 			<ContactSection {...contactSection} />
					// 		</div>
					// 	);
					default:
						return null;
				}
			})}
		</>
	);
};

export default SectionManager;
