import React, { useState } from "react";
import "./datePicker.css";
import Calendar from "./components/Calendar";
import defaultLocale from "date-fns/locale/en-US";

import { addYears, parseDate, formatDate } from "./utils/utils";

const DatePicker = (props) => {
  const { label, placeholder, selected, onChange } = props;
  const [inputVal, setInputVal] = useState("");
  const formatDateString = "MM/dd/yyyy";
  // const [preSelection, setPreSelection] = useState(newDate());
  const [selectedDate, setSelectedDate] = useState(selected);
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

  const handleSelect = (day) => {
    const date = formatDate(day, formatDateString, defaultLocale);
    setSelectedDate(day);
    setInputVal(date);

    if (day) onChange(day);
    onDayClicked();
  };

  const onInputClicked = () => {
    setShowCalendar(true);
  };

  const onDayClicked = () => {
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
        selected={selectedDate}
        onSelect={handleSelect}
        setInputVal={setInputVal}
        // preSelection={preSelection}
        defaultLocale={defaultLocale}
      />
    </>
  );
};

export default DatePicker;
