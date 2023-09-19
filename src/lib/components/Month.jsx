import React from "react";
import Week from "./Week";

import {
  // newDate,
  getMonth,
  getStartOfWeek,
  addDays,
  addWeeks,
  // getYear,
  getStartOfMonth,
  isSameMonth,
} from "../utils/utils";

// function renderWeekdays(dateOptions, weekdayDisplayFormat) {
//   const now = new Date();
//   return (
//     <div>
//       {eachDayOfInterval({
//         start: startOfWeek(now, dateOptions),
//         end: endOfWeek(now, dateOptions),
//       }).map((day, i) => (
//         <span key={i}>{format(day, weekdayDisplayFormat, dateOptions)}</span>
//       ))}
//     </div>
//   );
// }

function MonthTest(props) {
  const isWeekInMonth = (startOfWeek) => {
    const day = props.day;
    const endOfWeek = addDays(startOfWeek, 6);
    return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
  };

  // const isCurrentMonth = (day, m) =>
  //   getYear(day) === getYear(newDate()) && m === getMonth(newDate());

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
          monthShowsDuplicateDaysEnd={props.monthShowsDuplicateDaysEnd}
          monthShowsDuplicateDaysStart={props.monthShowsDuplicateDaysStart}
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

export default MonthTest;
