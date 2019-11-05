import React, { useState } from "react";
import $ from "./style.module.css";

const Tabs = props => {
	const [active, setStateActive] = useState(props.active != null ? props.active : 0);

	const setActive = index => {
		setStateActive(index);
		props.onChange(props.items[index]);
	};

	const { items, labelBackground, containerBackground } = props;

	const tabs = items.map((item, key) => (
		<div
			className={$.tab}
			key={key}
			onClick={() => setActive(key)}
			style={{
				background: labelBackground || containerBackground || "#ccc",
			}}
		>
			{item}
		</div>
	));

	return (
		<div
			className={$.tabs}
			style={{
				background: containerBackground || "#ccc",
			}}
		>
			{tabs}
		</div>
	);
};

export default Tabs;
