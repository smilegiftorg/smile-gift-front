import { IMissionAndValuesSection } from "@/types/IPageData";
import { getIconComponent } from "@/utils/systemIcon";
import Link from "next/link";
import Button from "../ui/Button";

function MissionAndValues(props: IMissionAndValuesSection) {
	const { title, description, missionItems, coreValues, button } = props;

	return (
		<section className="py-16 bg-neutral-50">
			<div className="container-custom">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						{title || "Sứ mệnh và Giá trị cốt lõi"}
					</h2>
					<p className="text-lg text-neutral-600 max-w-3xl mx-auto">
						{description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h3 className="text-2xl font-bold mb-4">Sứ mệnh</h3>
						<ul className="space-y-4">
							{missionItems?.map((item, index) => {
								const ICon = getIconComponent(item?.icon);
								return (
									<li className="flex" key={item?.id}>
										<div className="text-primary-700 mr-4 mt-1">
											{ICon ? <ICon size={20} /> : null}
										</div>
										<div>
											<p className="font-medium">{item?.text}</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md">
						<h3 className="text-2xl font-bold mb-4">Giá trị cốt lõi</h3>
						<div className="grid grid-cols-2 gap-4">
							{coreValues?.map((item) => {
								const { id, title, description } = item || {};
								const ICon = getIconComponent(item?.icon);
								return (
									<div key={id} className="p-4 bg-primary-50 rounded-lg">
										<div className="text-primary-700 mb-2">
											{ICon ? <ICon size={20} /> : null}
										</div>
										<h4 className="font-semibold text-lg mb-1">{title}</h4>
										<p className="text-sm text-neutral-600">{description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="text-center">
					<Button variant={button?.variant} size="lg">
						<Link href={button?.link || "/"}>{button?.text}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

export default MissionAndValues;
