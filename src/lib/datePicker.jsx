import React, { useState } from "react";
import "./datePicker.css";
import Calendar from "./components/Calendar";
import defaultLocale from "date-fns/locale/en-US";

import { addYears, newDate, parseDate, formatDate } from "./utils/utils";

const DatePicker = (props) => {
  const { label, placeholder, selected, onChange } = props;
  console.log("inDatePicker" + selected);
  const [inputVal, setInputVal] = useState("");
  const formatDateString = "MM/dd/yyyy";
  const [preSelection, setPreSelection] = useState(newDate());
  const monthDisplayFormat = "MMM yyyy";
  const fixedHeight = false;
  const showMonthArrow = true;
  const showMonthAndYearPickers = true;

  const maxDate = addYears(new Date(), 27);
  const minDate = addYears(new Date(), -100);
  const [showCalendar, setShowCalendar] = useState(true);

  const handleChange = (event) => {
    setInputVal(event.target.value);
    let date = parseDate(event.target.value, formatDateString, defaultLocale);
    if (date) onChange(date);
  };

  const onInputClicked = () => {
    setShowCalendar(true);
  };

  const dayClicked = () => {
    setShowCalendar(false);
  };

  return (
    <>
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type="texte"
          placeholder={placeholder}
          id={label}
          onChange={handleChange}
          onClick={onInputClicked}
          value={inputVal}
        />
      </div>
      <Calendar
        monthDisplayFormat={monthDisplayFormat}
        fixedHeight={fixedHeight}
        showMonthArrow={showMonthArrow}
        showMonthAndYearPickers={showMonthAndYearPickers}
        maxDate={maxDate}
        minDate={minDate}
        onClickOutside={() => setShowCalendar(false)}
        show={showCalendar}
        selected={selected}
        dayClicked={dayClicked}
        preSelection={preSelection}
        defaultLocale={defaultLocale}
      />
    </>
  );
};

export default DatePicker;
