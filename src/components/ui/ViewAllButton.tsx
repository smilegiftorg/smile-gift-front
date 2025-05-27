import { IButton } from "@/types/ICommon";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import { getIconComponent } from "@/utils/systemIcon";

const ViewAllButton: React.FC<IButton> = ({ variant, link, text, icon }) => {
	const IconComp = getIconComponent(icon);
	return (
		<Button variant={variant} rightIcon={IconComp ? <IconComp /> : undefined}>
			<Link href={link || "/"}>{text}</Link>
		</Button>
	);
};

export default ViewAllButton;
