import dayjs from "dayjs";

export const formatShortDate = (date: string) => {
	return dayjs(date).format("DD-MM-YYYY");
};
