import React, { useState } from "react";
import $ from "./style.module.css";

export default ({ items, onSelect }) => {
    items = items.map((item, key) => (
        <div className={$.grid_item} key={key}>
            {item}
        </div>
    ));

    return <div className={$.grid}>{items}</div>;
};
