"use strict";

var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_YEAR_ITEM_NUMBER = void 0;
Object.defineProperty(exports, "addDays", {
  enumerable: true,
  get: function get() {
    return _addDays.default;
  }
});
Object.defineProperty(exports, "addMonths", {
  enumerable: true,
  get: function get() {
    return _addMonths.default;
  }
});
Object.defineProperty(exports, "addWeeks", {
  enumerable: true,
  get: function get() {
    return _addWeeks.default;
  }
});
Object.defineProperty(exports, "addYears", {
  enumerable: true,
  get: function get() {
    return _addYears.default;
  }
});
exports.formatDate = formatDate;
Object.defineProperty(exports, "getDate", {
  enumerable: true,
  get: function get() {
    return _getDate.default;
  }
});
Object.defineProperty(exports, "getMonth", {
  enumerable: true,
  get: function get() {
    return _getMonth.default;
  }
});
exports.getStartOfMonth = getStartOfMonth;
exports.getStartOfWeek = getStartOfWeek;
exports.getWeekdayMinInLocale = getWeekdayMinInLocale;
Object.defineProperty(exports, "getYear", {
  enumerable: true,
  get: function get() {
    return _getYear.default;
  }
});
Object.defineProperty(exports, "isAfter", {
  enumerable: true,
  get: function get() {
    return _isAfter.default;
  }
});
Object.defineProperty(exports, "isBefore", {
  enumerable: true,
  get: function get() {
    return _isBefore.default;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function get() {
    return _isDate.default;
  }
});
exports.isSameDay = isSameDay;
exports.isSameMonth = isSameMonth;
exports.isValid = isValid;
exports.newDate = newDate;
exports.parseDate = parseDate;
Object.defineProperty(exports, "setMonth", {
  enumerable: true,
  get: function get() {
    return _setMonth.default;
  }
});
Object.defineProperty(exports, "setYear", {
  enumerable: true,
  get: function get() {
    return _setYear.default;
  }
});
Object.defineProperty(exports, "startOfDay", {
  enumerable: true,
  get: function get() {
    return _startOfDay.default;
  }
});
Object.defineProperty(exports, "subMonths", {
  enumerable: true,
  get: function get() {
    return _subMonths.default;
  }
});
var _isDate = _interopRequireDefault(require("date-fns/isDate"));
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
var _format = _interopRequireDefault(require("date-fns/format"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _addWeeks = _interopRequireDefault(require("date-fns/addWeeks"));
var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));
var _addYears = _interopRequireDefault(require("date-fns/addYears"));
var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));
var _getDate = _interopRequireDefault(require("date-fns/getDate"));
var _getMonth = _interopRequireDefault(require("date-fns/getMonth"));
var _getYear = _interopRequireDefault(require("date-fns/getYear"));
var _setMonth = _interopRequireDefault(require("date-fns/setMonth"));
var _setYear = _interopRequireDefault(require("date-fns/setYear"));
var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));
var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));
var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));
var _toDate = _interopRequireDefault(require("date-fns/toDate"));
var _parse = _interopRequireDefault(require("date-fns/parse"));
var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));
var DEFAULT_YEAR_ITEM_NUMBER = 12;

// ** Date Constructors **
exports.DEFAULT_YEAR_ITEM_NUMBER = DEFAULT_YEAR_ITEM_NUMBER;
function newDate(value) {
  var d = value ? typeof value === "string" || value instanceof String ? (0, _parseISO.default)(value) : (0, _toDate.default)(value) : new Date();
  return isValid(d) ? d : null;
}
function parseDate(value, dateFormat, locale, minDate) {
  var parsedDate = null;
  parsedDate = (0, _parse.default)(value, dateFormat, new Date(), {
    locale: locale
  });
  return isValid(parsedDate) ? parsedDate : null;
}

// ** Date "Reflection" **

function isValid(date, minDate) {
  minDate = minDate ? minDate : new Date("1/1/1000");
  return (0, _isValid.default)(date) && !(0, _isBefore.default)(date, minDate);
}

// ** Date Formatting **

function formatDate(date, formatStr, locale) {
  return (0, _format.default)(date, formatStr, {
    locale: locale
  });
}

// ** Date Setters **

// ** Date Getters **
// getDay Returns day of week, getDate returns day of month
// *** Start of ***
function getStartOfWeek(date, locale) {
  return (0, _startOfWeek.default)(date, {
    locale: locale
  });
}
function getStartOfMonth(date) {
  return (0, _startOfMonth.default)(date);
}

// ** Date Math **

// *** Addition ***
// *** Subtraction ***
// ** Date Comparison **
function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return (0, _isSameMonth.default)(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameDay(date1, date2) {
  if (date1 && date2) {
    return (0, _isSameDay.default)(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "eee", locale);
}