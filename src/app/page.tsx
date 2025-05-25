import DonationSection from "@/components/sections/DonationSection";
import SectionManager from "@/components/sections/SectionManager";
import VolunteerCTA from "@/components/sections/VolunteerCTA";
import { IBaseSection } from "@/types/ICommon";
import { IDonationSection, IVolunteerCTASection } from "@/types/IHomePage";
import { getStrapiURL } from "@/utils/api";

export default async function Home() {
	const res = await fetch(
		getStrapiURL(
			"/homepage?populate[sections][populate][backgroundImage]=true&populate[sections][populate][buttons][populate]=link&populate[sections][populate][image]=true&populate[sections][populate][coreValue][populate]=items&populate[sections][populate][stat][populate]=items&populate[sections][populate][button][populate]=link&populate[sections][populate][stats]=true&populate[sections][populate][viewAllButton]=true&populate[sections][populate][programs][populate]=image,category&populate[sections][populate][testimonials][populate][image]=true&populate[sections][populate][newsItems][populate]=image,category&populate[sections][populate][galleryItems][populate][image]=true&populate[sections][populate][benefits][populate]=true&populate[sections][populate][roles][populate]=true&populate[sections][populate][sponsoredItems][populate]=true&populate[sections][populate][bankInfo][populate]=true"
		),
		{
			next: { revalidate: 60 },
		}
	);
	const data = await res.json();
	const sections = data?.data?.attributes?.sections || [];
	const volunteerCTASection = sections.find(
		(item: IBaseSection<"sections.volunteer-cta">) =>
			item.__component === "sections.volunteer-cta"
	) as IVolunteerCTASection;

	const donationSection = sections.find(
		(item: IBaseSection<"sections.donation">) =>
			item.__component === "sections.donation"
	) as IDonationSection;
	return (
		<>
			<SectionManager sections={sections} />
			<div className="bg-primary-50 py-20">
				{/* <div className="absolute inset-0 opacity-10 bg-pattern-leaves"></div> */}
				<div className="container-custom">
					<div className="grid md:grid-cols-2 gap-10">
						<VolunteerCTA {...volunteerCTASection} />
						<DonationSection {...donationSection} />
					</div>
				</div>
			</div>
		</>
	);
}
