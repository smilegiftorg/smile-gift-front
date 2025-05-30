import dayjs from "dayjs";

export const formatShortDate = (date: string) => {
	return dayjs(date).format("DD-MM-YYYY");
};

export const generateYears = () => {
	const startYear = 2022;
	const currentYear = dayjs().year();

	const years = Array.from(
		{ length: currentYear - startYear + 1 },
		(_, i) => startYear + i
	);
	return years;
};
