import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";

interface IFieldSearchProps {
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	currentValue: string;
}

function FieldSearch(props: IFieldSearchProps) {
	const { placeholder, onChange: onChangeCallback, currentValue } = props;
	const [searchText, setSearchText] = useState("");
	const debouncedOnChange = useMemo(
		() =>
			debounce(
				(e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e),
				500
			),
		[onChangeCallback]
	);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		debouncedOnChange(e);
	};

	useEffect(() => {
		if (currentValue) {
			setSearchText(currentValue);
		}
	}, [currentValue]);
	return (
		<div className="flex-1 relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<FaSearch className="text-white" />
			</div>
			<input
				type="text"
				placeholder={placeholder || "Tìm kiếm ..."}
				className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
				onChange={onChange}
				value={searchText}
			/>
		</div>
	);
}

export default FieldSearch;
