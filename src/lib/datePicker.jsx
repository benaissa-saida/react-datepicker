import React, { useState } from "react";
import "./datePicker.css";
import Month from "./components/Month";
// import MonthTest from "./components/MonthTest";
import defaultLocale from "date-fns/locale/en-US";
import {
  min,
  max,
  newDate,
  setMonth,
  getMonth,
  addMonths,
  subMonths,
  formatDate,
  setYear,
  getYear,
  isBefore,
  addYears,
  isAfter,
} from "./utils/utils";

const DatePicker = (props) => {
  const monthDisplayFormat = "MMM yyyy";
  const fixedHeight = false;
  const monthsShown = 1;
  let showPreviousMonths;
  const showMonthArrow = true;
  const showMonthAndYearPickers = true;
  // const showYearPicker = true;

  const maximumDate = addYears(new Date(), 20);
  const minimumDate = addYears(new Date(), -100);

  const getDateInView = () => {
    const { preSelection, selected, openToDate } = props;
    const minDate = minimumDate;
    const maxDate = maximumDate;
    const current = newDate();
    const initialDate = openToDate || selected || preSelection;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && isBefore(current, minDate)) {
        return minDate;
      } else if (maxDate && isAfter(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };
  const [date, setDate] = useState(getDateInView());
  const increaseMonth = () => setDate(addMonths(date, 1));

  const decreaseMonth = () => setDate(subMonths(date, 1));
  // const formatWeekDay = () => getWeekdayMinInLocale(date, defaultLocale);

  // const decreaseYear = () => setDate(subYears(date, 1));
  // const increaseYear = () =>
  //   setDate(addYears(date, showYearPicker ? yearItemNumber : 1));

  const getMonthNames = () => {
    return [...Array(12).keys()].map((i) => defaultLocale.localize.month(i));
  };
  const monthNames = getMonthNames();

  const changeShownDate = (value, mode = "set") => {
    const minDate = minimumDate;
    const maxDate = maximumDate;
    const modeMapper = {
      monthOffset: () => addMonths(date, value),
      setMonth: () => setMonth(date, value),
      setYear: () => setYear(date, value),
      set: () => value,
    };

    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    setDate(newDate);
  };

  const renderMonthAndYear = () => {
    const minDate = minimumDate;
    const maxDate = maximumDate;
    const upperYearLimit = maxDate.getFullYear();
    const lowerYearLimit = minDate.getFullYear();

    return (
      <div onMouseUp={(e) => e.stopPropagation()}>
        {showMonthArrow ? (
          <button type="button" onClick={() => decreaseMonth()}>
            <i />
          </button>
        ) : null}
        {showMonthAndYearPickers ? (
          <span>
            <span>
              <select
                value={getMonth(date)}
                onChange={(e) => changeShownDate(e.target.value, "setMonth")}
              >
                {monthNames.map((monthName, i) => (
                  <option key={i} value={i}>
                    {monthName}
                  </option>
                ))}
              </select>
            </span>
            <span />
            <span>
              <select
                value={getYear(date)}
                onChange={(e) => changeShownDate(e.target.value, "setYear")}
              >
                {new Array(upperYearLimit - lowerYearLimit + 1)
                  .fill(lowerYearLimit)
                  .map((val, i) => {
                    const year = val + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
              </select>
            </span>
          </span>
        ) : null}
        {showMonthArrow ? (
          <button type="button" onClick={() => increaseMonth()}>
            <i />
          </button>
        ) : null}
      </div>
    );
  };

  const renderWeekdays = () => {
    const monthList = [];
    const monthsToSubtract = showPreviousMonths ? monthsShown - 1 : 0;
    const fromMonthDate = subMonths(date, monthsToSubtract);
    const monthSelectedIn = monthsToSubtract;
    for (let i = 0; i < monthsShown; ++i) {
      const monthsToAdd = i - monthSelectedIn + monthsToSubtract;
      const monthDate = addMonths(fromMonthDate, monthsToAdd);
      const monthKey = `month-${i}`;
      const monthShowsDuplicateDaysEnd = i < monthsShown - 1;
      const monthShowsDuplicateDaysStart = i > 0;

      monthList.push(
        <div key={monthKey}>
          <Month
            day={monthDate}
            calendarStartOn={0}
            orderInDisplay={i}
            locale={defaultLocale}
            minDate={minimumDate}
            maxDate={maximumDate}
            fixedHeight={fixedHeight}
            peekNextMonth={false}
            monthShowsDuplicateDaysEnd={monthShowsDuplicateDaysEnd}
            monthShowsDuplicateDaysStart={monthShowsDuplicateDaysStart}
          />
        </div>
      );
    }
    return monthList;
  };

  return (
    <div className="simple-form-group">
      Month: {formatDate(date, monthDisplayFormat, defaultLocale)}
      {renderMonthAndYear()}
      {renderWeekdays()}
    </div>
  );
};

export default DatePicker;
