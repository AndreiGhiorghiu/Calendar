import React, { cloneElement, useState } from "react";

import isSameDay from "date-fns/isSameDay";
import isWeekend from "date-fns/isWeekend";

import Tabs from "components/Tabs";
import Calendar from "components/Calendar";

import $ from "./style.module.css";

const specialDates = [
  {
    type: "holiday",
    date: "2019-09-21",
    name: "holiday 1",
  },
  {
    type: "holiday",
    date: "2019-09-21",
    name: "holiday 2",
  },
  {
    type: "event",
    date: "2019-09-29",
    name: "event 1",
  },
  {
    type: "event",
    date: "2019-09-21",
    name: "event 2",
  },
  {
    type: "reminder",
    date: "2019-09-21",
    name: "reminder 1",
  },
];

const viewTabs = ["YEAR", "MONTH"];

const SpecialDay = ({ date }) => (
  <div>
    {specialDates.map((specialDate, key) => {
      if (isSameDay(date, new Date(specialDate.date))) {
        return (
          <div
            key={key}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              border: `2px solid ${
                specialDate.type == "holiday"
                  ? "red"
                  : specialDate.type == "event"
                  ? "green"
                  : specialDate.type == "reminder"
                  ? "orange"
                  : "transparent"
              }`,
            }}
          />
        );
      }
    })}
  </div>
);

const DisplaySpecialDay = ({ date, title }) => {
  let hasEvents = false;
  specialDates.map((specialDate, key) => {
    if (isSameDay(date, new Date(specialDate.date))) {
      hasEvents = true;
    }
  });
  return (
    <div>
      {hasEvents ? <div className={$.title}>{title}</div> : null}
      {specialDates.map((specialDate, key) => {
        if (isSameDay(date, new Date(specialDate.date))) {
          return (
            <div
              key={key}
              style={{
                color: `${
                  specialDate.type == "holiday"
                    ? "red"
                    : specialDate.type == "event"
                    ? "green"
                    : specialDate.type == "reminder"
                    ? "orange"
                    : "transparent"
                }`,
                fontWeight: "bold",
              }}
            >
              {specialDate.name}
            </div>
          );
        }
      })}
    </div>
  );
};

const Application = props => {
  const [state, setState] = useState({
    date: new Date(),
    view: "month",
  });

  const onRender = ({ dayOfMonth, date }, cell) => {
    const content = (
      <div>
        {dayOfMonth}
        <SpecialDay date={date} />
      </div>
    );
    const isWeekendDay = isWeekend(date);

    const styles = {
      backgroundColor: isWeekendDay ? "rgba(0,0,0,0.1)" : "",
      padding: "0.75rem 0",
    };

    if (cell != null)
      return cloneElement(
        cell,
        {
          style: styles,
        },
        content,
      );
    return content;
  };

  const onSelect = (date, dayOfMonth, type, cell) => {
    const styles = {
      borderColor: "yellow",
      padding: "0.75rem 0",
    };

    if (cell != null) {
      return cloneElement(
        cell,
        {
          style: styles,
        },
        <div>
          {dayOfMonth}
          <SpecialDay date={date} />
        </div>,
      );
    }

    setState({ ...state, date: date });
  };

  const onChangeViewByLabel = label => {
    setState({ ...state, view: label });
  };

  const { date, view } = state;

  return (
    <div>
      <div className={$.tabs}>
        <Tabs
          items={viewTabs}
          containerBackground="#f9f9f9"
          active="1"
          onChange={label => onChangeViewByLabel(label)}
        />
      </div>
      <Calendar
        date={date}
        view={view}
        onChangeView={view.toLowerCase() == "year" ? () => onChangeViewByLabel("month") : ""}
        onChange={onSelect}
        onRender={onRender}
      />
      <div className={$.events_list}>
        <DisplaySpecialDay date={date} title="Events" />
      </div>
    </div>
  );
};

export default () => (
  <div className={$.application}>
    <link
      rel="stylesheet"
      href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
    />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />

    <Application />
  </div>
);
