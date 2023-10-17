import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Month from "./Month";
import usePrevious from "../utils/usePrevious";

import {
  newDate,
  setMonth,
  getMonth,
  addMonths,
  subMonths,
  getStartOfWeek,
  getWeekdayMinInLocale,
  addDays,
  isSameDay,
  setYear,
  getYear,
  isBefore,
  isAfter,
} from "../utils/utils";

const Calendar = (props) => {
  const getDateInView = () => {
    const { selectedDate, maxDate, minDate } = props;
    const current = newDate();
    const initialDate = selectedDate;
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
  const ref = useRef(null);
  const previousSelectedDate = usePrevious(props.selectedDate);

  useEffect(() => {
    if (
      props.selectedDate &&
      isSameDay(props.selectedDate, previousSelectedDate)
    ) {
      setDate(props.selectedDate);
    }
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClickOutside && props.onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props, previousSelectedDate]);

  const handleClick = (day) => {
    props.onSelect(day);
  };

  const increaseMonth = () => setDate(addMonths(date, 1));

  const decreaseMonth = () => setDate(subMonths(date, 1));

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

  const setTodayDate = () => {
    props.onSelect(newDate());
  };

  const header = (date) => {
    const startOfWeek = getStartOfWeek(date, props.defaultLocale, 0);
    const dayNames = [];

    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(startOfWeek, offset);
        const weekDayName = getWeekdayMinInLocale(day, props.defaultLocale);

        return (
          <div key={offset} className="calendar-weekday">
            {weekDayName}
          </div>
        );
      })
    );
  };

  const renderCalendarHeader = () => {
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
      <div className="calendar-monthpicker">
        {props.showMonthBtn ? (
          <button
            className="calendar-monthpicker__prevBtn"
            type="button"
            onClick={() => decreaseMonth()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 0 256 512"
            >
              {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
          </button>
        ) : null}
        {
          <button
            className="calendar-monthpicker__todayBtn"
            type="button"
            onClick={() => setTodayDate()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12px"
              viewBox="0 0 576 512"
            >
              {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </button>
        }
        {props.showMonthAndYearPickers ? (
          <span className="calendar-monthAndYear">
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
        {props.showMonthBtn ? (
          <button
            className="calendar-monthpicker__nextBtn"
            type="button"
            onClick={() => increaseMonth()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 0 256 512"
            >
              {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
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
      <div className="calendar-datepicker">
        <div className="calendar-weekdays">{header(monthDate)}</div>

        <Month
          day={monthDate}
          calendarStartOn={0}
          locale={props.defaultLocale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          peekNextMonth={false}
          selectedDate={props.selectedDate}
          onSelect={handleClick}
        />
      </div>
    );
  };

  if (!props.showCalendar) return null;

  return (
    <div className="calendar-container" ref={ref}>
      {renderCalendarHeader()}
      {renderWeekdays()}
    </div>
  );
};

Calendar.protoTypes = {
  defaultLocale: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  showMonthBtn: PropTypes.bool.isRequired,
  showMonthAndYearPickers: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Calendar;
