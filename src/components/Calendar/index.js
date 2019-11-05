import React, { useState } from "react";
import format from "date-fns/format";
import getYear from "date-fns/getYear";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import addYears from "date-fns/addYears";
import subYears from "date-fns/subYears";
import getMonthViewByDay from "./getMonthViewByDay.js";
import Header from "./Header";
import WeekDays from "./WeekDays";
import Grid from "./Grid";
import Day from "./Day";
import $ from "./style.module.css";

export default function Calendar(props) {
	const [date, setDate] = useState(new Date(props.date) || Date());
	const [inViewDate, setInViewDate] = useState(new Date(props.date) || Date());
	const [year, setYear] = useState(getYear(new Date(props.date) || Date()));

	const onSelect = selected => {
		const { onChange, onChangeView } = props;

		setDate(selected);
		setInViewDate(selected);

		if (typeof onChange === "function") {
			onChange(selected);
		}
		if (typeof onChangeView === "function") {
			onChangeView("month");
		}
	};

	const nextMonth = () => {
		const nextMonth = addMonths(inViewDate, 1);

		setDate(nextMonth);
		setInViewDate(nextMonth);
		setYear(getYear(nextMonth));
	};

	const prevMonth = () => {
		const prevMonth = subMonths(inViewDate, 1);

		setDate(prevMonth);
		setInViewDate(prevMonth);
		setYear(getYear(prevMonth));
	};

	const nextYear = () => {
		setYear(year + 1);
	};

	const prevYear = () => {
		setYear(year - 1);
	};

	const { onRender, view } = props;

	const days = getMonthViewByDay(inViewDate, date);
	const labelSelectedMonth = format(inViewDate, "MMM");
	const labelSelectedYear = year;
	const label = `${labelSelectedMonth} ${labelSelectedYear}`;

	const items = days.map(({ date, type }) => (
		<Day date={date} type={type} onSelect={onSelect} onRender={onRender} />
	));

	return (
		<div>
			{view.toLowerCase() == "month" ? (
				<div className={$.calendar}>
					<Header label={label} next={nextMonth} prev={prevMonth} />
					<WeekDays />
					<Grid items={items} />
				</div>
			) : view.toLowerCase() == "year" ? (
				<div className={$.calendar}>
					<Header label={labelSelectedYear} next={nextYear} prev={prevYear} />
					<div className={$.months}>
						{new Array(12).fill(null).map((index, key) => {
							const selectedDate = new Date(year, key);
							const labelMonth = format(selectedDate, "MMM");
							const selectedDays = getMonthViewByDay(selectedDate, date);
							const currentItems = selectedDays.map(({ date, type }) => (
								<Day date={date} type={type} />
							));

							return (
								<div
									className={$.month}
									key={key}
									onClick={() => onSelect(selectedDate)}
								>
									<Header label={labelMonth} />
									<WeekDays isMultipleView="true" />
									<Grid items={currentItems} />
								</div>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
}
