import isDate from "date-fns/isDate";
import isValidDate from "date-fns/isValid";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import subMonths from "date-fns/subMonths";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import dfIsSameDay from "date-fns/isSameDay";
import dfIsSameMonth from "date-fns/isSameMonth";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import toDate from "date-fns/toDate";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";

export const DEFAULT_YEAR_ITEM_NUMBER = 12;

// ** Date Constructors **

export function newDate(value) {
  const d = value
    ? typeof value === "string" || value instanceof String
      ? parseISO(value)
      : toDate(value)
    : new Date();
  return isValid(d) ? d : null;
}

export function parseDate(value, dateFormat, locale, minDate) {
  let parsedDate = null;

  parsedDate = parse(value, dateFormat, new Date(), { locale: locale });

  return isValid(parsedDate) ? parsedDate : null;
}

// ** Date "Reflection" **

export { isDate };

export function isValid(date, minDate) {
  minDate = minDate ? minDate : new Date("1/1/1000");
  return isValidDate(date) && !isBefore(date, minDate);
}

// ** Date Formatting **

export function formatDate(date, formatStr, locale) {
  return format(date, formatStr, {
    locale: locale,
  });
}

// ** Date Setters **

export { setMonth, setYear };

// ** Date Getters **

// getDay Returns day of week, getDate returns day of month
export { getMonth, getYear, getDate };

// *** Start of ***

export { startOfDay };

export function getStartOfWeek(date, locale) {
  return startOfWeek(date, {
    locale: locale,
  });
}

export function getStartOfMonth(date) {
  return startOfMonth(date);
}

// ** Date Math **

// *** Addition ***

export { addDays, addWeeks, addMonths, addYears };

// *** Subtraction ***

export { subMonths };

// ** Date Comparison **

export { isBefore, isAfter };

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return dfIsSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameDay(date1, date2) {
  if (date1 && date2) {
    return dfIsSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "eee", locale);
}
