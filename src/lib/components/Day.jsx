import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";

import { newDate, getDate, getMonth, isSameDay } from "../utils/utils";

const Day = (props) => {
  const [dayHover, setDayHover] = useState(false);

  const handleMouseEvent = (event) => {
    switch (event.type) {
      case "mouseenter":
        setDayHover(true);
        break;
      case "mouseleave":
        setDayHover(false);
        break;
      default:
        setDayHover(false);
    }
  };
  const isSameDayOfProps = (other) => isSameDay(props.day, other);

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
  const isSelected = () => isSameDayOfProps(props.selectedDate);

  const renderDays = () => {
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
    <div
      className={getClasses()}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
      onClick={handleClick}
    >
      <span>{renderDays()}</span>
    </div>
  );
};

Day.protoTypes = {
  locale: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  key: PropTypes.number,
  month: PropTypes.number.isRequired,
};

export default Day;
