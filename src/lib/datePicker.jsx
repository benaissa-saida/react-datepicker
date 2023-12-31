import React, { useState } from "react";
import PropTypes from "prop-types";
import "./datePicker.css";
import Calendar from "./components/Calendar";
import defaultLocale from "date-fns/locale/en-US";

import { addYears, parseDate, formatDate } from "./utils/utils";

const DatePicker = (props) => {
  const { label, placeholder, selected, onChange } = props;
  const [inputVal, setInputVal] = useState("");
  const formatDateString = "MM/dd/yyyy";
  const [selectedDate, setSelectedDate] = useState(selected);
  const showMonthArrow = true;
  const showMonthAndYearPickers = true;

  const maxDate = addYears(new Date(), 27);
  const minDate = addYears(new Date(), -100);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (event) => {
    let date = parseDate(event.target.value, formatDateString, defaultLocale);
    setSelectedDate(date);
    setInputVal(event.target.value);

    if (date) onChange(date);
  };

  const handleSelect = (day) => {
    const date = formatDate(day, formatDateString, defaultLocale);
    setSelectedDate(day);
    setInputVal(date);

    if (day) onChange(date);
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
        showMonthBtn={showMonthArrow}
        showMonthAndYearPickers={showMonthAndYearPickers}
        maxDate={maxDate}
        minDate={minDate}
        onClickOutside={() => setShowCalendar(false)}
        showCalendar={showCalendar}
        selectedDate={selectedDate}
        onSelect={handleSelect}
        defaultLocale={defaultLocale}
      />
    </>
  );
};

DatePicker.protoTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
