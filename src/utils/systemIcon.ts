import {
	FaArrowRight,
	FaPeopleCarry,
	FaHandHoldingHeart,
	FaCalendarAlt,
	FaHandHoldingUsd,
	FaRegSmile,
	FaTheaterMasks,
	FaMicrophone,
	FaCamera,
	FaLightbulb,
	FaHandshake,
} from "react-icons/fa";

export const getIconComponent = (icon: string) => {
	const icons: Record<string, any> = {
		FaArrowRight,
		FaPeopleCarry,
		FaHandHoldingHeart,
		FaCalendarAlt,
		FaHandHoldingUsd,
		FaRegSmile,
		FaTheaterMasks,
		FaMicrophone,
		FaCamera,
		FaLightbulb,
		FaHandshake,
	};

	return icons[icon] || null;
};
