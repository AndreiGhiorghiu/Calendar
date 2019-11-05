import React, { useState, useEffect } from "react";

import $ from "./style.module.css";

const weekDaysNames = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const weekDaysNamesSmall = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDaysNamesXSmall = ["M", "T", "W", "T", "F", "S", "S"];

const WeekDays = props => {
	const [weekDays, setWeekDays] = useState(null);

	useEffect(() => {
		const { isMultipleView } = props;
		setWeekDays(
			window.innerWidth > 640 && !isMultipleView
				? weekDaysNames
				: window.innerWidth > 480 && !isMultipleView
				? weekDaysNamesSmall
				: weekDaysNamesXSmall,
		);

		window.addEventListener("resize", () => setWeekDaysName());
	}, []);

	const setWeekDaysName = () => {
		const { isMultipleView } = props;

		setWeekDays(
			window.innerWidth > 640 && !isMultipleView
				? weekDaysNames
				: window.innerWidth > 480 && !isMultipleView
				? weekDaysNamesSmall
				: weekDaysNamesXSmall,
		);
	};

	return (
		<div className={$.container}>
			{weekDays == null
				? null
				: weekDays.map((weekDay, key) => {
						return (
							<div key={key} className={$.week_day}>
								{weekDay}
							</div>
						);
				  })}
		</div>
	);
};

export default WeekDays;
