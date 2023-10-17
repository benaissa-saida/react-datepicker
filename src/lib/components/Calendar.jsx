import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Month from "./Month";
import usePrevious from "../utils/usePrevious";
import home from "../../assets/home.svg";
import caretLeft from "../../assets/caret-left.svg";
import caretRight from "../../assets/caret-right.svg";

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
            <img src={caretLeft} alt="decrease month" />
          </button>
        ) : null}
        {
          <button
            className="calendar-monthpicker__todayBtn"
            type="button"
            onClick={() => setTodayDate()}
          >
            <img src={home} alt="set today date" />
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
            <img src={caretRight} alt="increase month" />
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
