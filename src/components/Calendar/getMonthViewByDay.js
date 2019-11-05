import React, { useState } from "react";
import getStartOfMonth from "date-fns/startOfMonth";
import getStartOfWeek from "date-fns/startOfWeek";
import getMonth from "date-fns/getMonth";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";

export default function getMonthViewByDay(day, selected) {
	const items = [];

	const today = new Date();
	const month = getMonth(day);
	const startOfMonth = getStartOfMonth(day);
	const startOfWeek = getStartOfWeek(startOfMonth, { weekStartsOn: 1 });

	for (let i = 0; i < 42; ++i) {
		const date = addDays(startOfWeek, i);

		let type = "default";

		if (!isSameMonth(date, day)) {
			type = i < 21 ? "previous" : "next";
		} else {
			if (isSameDay(date, today)) {
				type = "current";

				if (isSameDay(today, selected)) {
					type = "current_selected";
				}
			} else if (isSameDay(date, selected)) {
				type = "selected";
			}
		}

		items.push({ type, date });
	}

	return items;
}
