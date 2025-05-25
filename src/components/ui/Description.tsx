"use client";

import React, { useEffect, useState } from "react";

function Description({
	description,
	classes,
}: {
	description: string;
	classes: string;
}) {
	const [htmlReady, setHtmlReady] = useState(false);

	useEffect(() => {
		setHtmlReady(true);
	}, []);

	return (
		<>
			{htmlReady && description && (
				<p
					className={classes}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
		</>
	);
}

export default Description;
