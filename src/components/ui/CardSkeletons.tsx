import React from "react";

function CardSkeletons() {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{[1, 2, 3, 4, 5, 6].map((n) => (
				<div key={n} className="animate-pulse">
					<div className="bg-neutral-200 h-48 rounded-t-lg"></div>
					<div className="bg-white p-6 rounded-b-lg">
						<div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
						<div className="h-8 bg-neutral-200 rounded mb-4"></div>
						<div className="space-y-2">
							<div className="h-4 bg-neutral-200 rounded"></div>
							<div className="h-4 bg-neutral-200 rounded w-5/6"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default CardSkeletons;
