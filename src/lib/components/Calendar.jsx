import React, { useState, useRef, useEffect } from "react";
import Month from "./Month";
// import defaultLocale from "date-fns/locale/en-US";
import {
  newDate,
  setMonth,
  getMonth,
  addMonths,
  subMonths,
  //   formatDate,
  setYear,
  getYear,
  isBefore,
  isAfter,
} from "../utils/utils";

const Calendar = (props) => {
  //   const monthDisplayFormat = "MMM yyyy";
  //   const fixedHeight = false;
  //   // const monthsShown = 1;
  //   // let showPreviousMonths;
  //   const showMonthArrow = true;
  //   const showMonthAndYearPickers = true;

  //   const maximumDate = addYears(new Date(), 20);
  //   const minimumDate = addYears(new Date(), -100);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClickOutside && props.onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props, props.onClickOutside]);

  const getDateInView = () => {
    const { preSelection, selected, maxDate, minDate } = props;
    console.log("selected" + selected, "preSelection" + preSelection);
    const current = newDate();
    const initialDate = selected || preSelection;
    console.log("init", initialDate);
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
  console.log(date);
  const increaseMonth = () => setDate(addMonths(date, 1));

  const decreaseMonth = () => setDate(subMonths(date, 1));
  // const formatWeekDay = () => getWeekdayMinInLocale(date, defaultLocale);

  // const decreaseYear = () => setDate(subYears(date, 1));
  // const increaseYear = () =>
  //   setDate(addYears(date, showYearPicker ? yearItemNumber : 1));

  const getMonthNames = () => {
    return [...Array(12).keys()].map((i) =>
      props.defaultLocale.localize.month(i)
    );
  };
  const monthNames = getMonthNames();

  const changeShownDate = (value, mode = "set") => {
    const modeMapper = {
      setMonth: () => setMonth(date, value),
      setYear: () => setYear(date, value),
      set: () => value,
    };

    const newDate = modeMapper[mode]();
    setDate(newDate);
  };

  const renderMonthAndYear = () => {
    const { maxDate, minDate } = props;
    const upperYearLimit = maxDate.getFullYear();
    const lowerYearLimit = minDate.getFullYear();

    const yearOptions = [];
    const monthOptions = [];

    for (let i = lowerYearLimit; i <= upperYearLimit; i++) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    monthOptions.push(
      monthNames.map((monthName, i) => (
        <option key={i} value={i}>
          {monthName}
        </option>
      ))
    );

    return (
      <div>
        {props.showMonthArrow ? (
          <button type="button" onClick={() => decreaseMonth()}>
            &lsaquo;
          </button>
        ) : null}
        {
          <button
            type="button"
            onClick={() => changeShownDate(newDate(), "set")}
          >
            &hearts;
          </button>
        }
        {props.showMonthAndYearPickers ? (
          <span>
            <span>
              <select
                value={getMonth(date)}
                onChange={(e) => changeShownDate(e.target.value, "setMonth")}
              >
                {monthOptions}
              </select>
            </span>
            <span />
            <span>
              <select
                value={getYear(date)}
                onChange={(e) => changeShownDate(e.target.value, "setYear")}
              >
                {yearOptions}
              </select>
            </span>
          </span>
        ) : null}
        {props.showMonthArrow ? (
          <button type="button" onClick={() => increaseMonth()}>
            &rsaquo;
          </button>
        ) : null}
      </div>
    );
  };

  const renderWeekdays = () => {
    const monthsToSubtract = 0;
    const fromMonthDate = subMonths(date, monthsToSubtract);
    const monthDate = addMonths(fromMonthDate, 0);

    return (
      <div>
        <Month
          day={monthDate}
          calendarStartOn={0}
          locale={props.defaultLocale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          fixedHeight={props.fixedHeight}
          peekNextMonth={false}
          selected={props.selected}
        />
      </div>
    );
  };

  if (!props.show) return null;

  return (
    <div className="simple-form-group" ref={ref}>
      {renderMonthAndYear()}
      {renderWeekdays()}
    </div>
  );
};

export default Calendar;
