import React, { useState } from "react";
import classnames from "classnames";

import {
  newDate,
  //  getDay,
  getDate,
  getMonth,
  isSameDay,
} from "../utils/utils";

const DayTest = (props) => {
  const [dayHover, setDayHover] = useState(false);

  const handleMouseEvent = (event) => {
    switch (event.type) {
      case "mouseenter":
        setDayHover(true);
        break;
      case "blur":
      case "mouseleave":
        setDayHover(false);
        break;
      default:
        setDayHover(false);
    }
  };
  const isSameDayOfProps = (other) => isSameDay(props.day, other);
  // const isWeekend = () => {
  //   const weekday = getDay(this.props.day);
  //   return weekday === 0 || weekday === 6;
  // };
  const isAfterMonth = () => {
    return (
      props.month !== undefined &&
      (props.month + 1) % 12 === getMonth(props.day)
    );
  };
  const isBeforeMonth = () => {
    return (
      props.month !== undefined &&
      (getMonth(props.day) + 1) % 12 === props.month
    );
  };
  const isCurrentDay = () => isSameDayOfProps(newDate());
  const isSelected = () => isSameDayOfProps(props.selected);

  const renderDays = () => {
    // if (props.monthShowsDuplicateDaysEnd && isAfterMonth()) return null;
    // if (props.monthShowsDuplicateDaysStart && isBeforeMonth()) return null;
    return getDate(props.day);
  };
  const handleClick = (event) => {
    props.onSelect(event);
  };

  const getClasses = () => {
    return classnames("day", {
      "outside-month": isAfterMonth() || isBeforeMonth(),
      "current-day": isCurrentDay(),
      "selected-day": isSelected(),
      "hover-day": dayHover,
    });
  };

  return (
    // <div>
    //   <ul>
    //     {days.map((day, index) => (
    //       <li key={index}>
    //         {format(day, "d")} - {format(day, "EEEE")}
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    // <button type="button">
    //   <span>
    //     {dayContentRenderer?.(day) || (
    //       <span>{format(day, dayDisplayFormat)}</span>
    //     )}
    //   </span>
    // </button>
    <div>
      <span
        className={getClasses()}
        onBlur={handleMouseEvent}
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
        onClick={handleClick}
      >
        {renderDays()}
      </span>
    </div>
  );
};

export default DayTest;
