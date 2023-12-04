import React from "react";
import PropTypes from "prop-types";
import Week from "./Week";

import {
  getMonth,
  getStartOfWeek,
  addDays,
  addWeeks,
  getStartOfMonth,
  isSameMonth,
} from "../utils/utils";

function Month(props) {
  const isWeekInMonth = (startOfWeek) => {
    const day = props.day;
    const endOfWeek = addDays(startOfWeek, 6);
    return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
  };

  const handleClick = (day) => {
    props.onSelect(day);
  };

  const renderWeeks = () => {
    const weeks = [];

    let i = 0;

    let currentWeekStart = getStartOfWeek(
      getStartOfMonth(props.day),
      props.locale
    );

    //as long as the week is in the month
    while (true) {
      //We send to the array every week
      weeks.push(
        <Week
          key={i}
          day={currentWeekStart}
          calendarStartOn={props.calendarStartOn}
          month={getMonth(props.day)}
          locale={props.locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          selectedDate={props.selectedDate}
          onSelect={handleClick}
        />
      );

      i++;
      currentWeekStart = addWeeks(currentWeekStart, 1);

      if (!isWeekInMonth(currentWeekStart)) {
        break;
      }
    }

    return weeks;
  };

  return <div className="calendar-weeks">{renderWeeks()}</div>;
}

Month.protoTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  calendarStartOn: PropTypes.number.isRequired,
  locale: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  peekNextMonth: PropTypes.bool.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Month;
