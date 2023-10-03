import React from "react";
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

  const renderWeeks = () => {
    const weeks = [];

    let i = 0;

    let currentWeekStart = getStartOfWeek(
      getStartOfMonth(props.day),
      props.locale,
      props.calendarStartOn
    );

    while (true) {
      weeks.push(
        <Week
          key={i}
          day={currentWeekStart}
          calendarStartOn={props.calendarStartOn}
          month={getMonth(props.day)}
          locale={props.locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          selected={props.selected}
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

  return <>{renderWeeks()}</>;
}

export default Month;
