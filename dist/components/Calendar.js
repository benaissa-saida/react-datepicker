"use strict";

var _interopRequireWildcard = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"));
var _slicedToArray2 = _interopRequireDefault(require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Month = _interopRequireDefault(require("./Month"));
var _usePrevious = _interopRequireDefault(require("../utils/usePrevious"));
var _utils = require("../utils/utils");
var _jsxRuntime = require("react/jsx-runtime");
var Calendar = function Calendar(props) {
  var getDateInView = function getDateInView() {
    var selectedDate = props.selectedDate,
      maxDate = props.maxDate,
      minDate = props.minDate;
    var current = (0, _utils.newDate)();
    var initialDate = selectedDate;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && (0, _utils.isBefore)(current, minDate)) {
        return minDate;
      } else if (maxDate && (0, _utils.isAfter)(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };
  var _useState = (0, _react.useState)(getDateInView()),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    date = _useState2[0],
    setDate = _useState2[1];
  var ref = (0, _react.useRef)(null);
  var previousSelectedDate = (0, _usePrevious.default)(props.selectedDate);
  (0, _react.useEffect)(function () {
    if (props.selectedDate && (0, _utils.isSameDay)(props.selectedDate, previousSelectedDate)) {
      setDate(props.selectedDate);
    }
    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClickOutside && props.onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return function () {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props, previousSelectedDate]);
  var handleClick = function handleClick(day) {
    props.onSelect(day);
  };
  var increaseMonth = function increaseMonth() {
    return setDate((0, _utils.addMonths)(date, 1));
  };
  var decreaseMonth = function decreaseMonth() {
    return setDate((0, _utils.subMonths)(date, 1));
  };
  var getMonthNames = function getMonthNames() {
    return (0, _toConsumableArray2.default)(Array(12).keys()).map(function (i) {
      return props.defaultLocale.localize.month(i);
    });
  };
  var monthNames = getMonthNames();
  var changeShownDate = function changeShownDate(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "set";
    var modeMapper = {
      setMonth: function setMonth() {
        return (0, _utils.setMonth)(date, value);
      },
      setYear: function setYear() {
        return (0, _utils.setYear)(date, value);
      },
      set: function set() {
        return value;
      }
    };
    var newDate = modeMapper[mode]();
    setDate(newDate);
  };
  var setTodayDate = function setTodayDate() {
    props.onSelect((0, _utils.newDate)());
  };
  var header = function header(date) {
    var startOfWeek = (0, _utils.getStartOfWeek)(date, props.defaultLocale, 0);
    var dayNames = [];
    return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = (0, _utils.addDays)(startOfWeek, offset);
      var weekDayName = (0, _utils.getWeekdayMinInLocale)(day, props.defaultLocale);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "calendar-weekday",
        children: weekDayName
      }, offset);
    }));
  };
  var renderCalendarHeader = function renderCalendarHeader() {
    var maxDate = props.maxDate,
      minDate = props.minDate;
    var upperYearLimit = maxDate.getFullYear();
    var lowerYearLimit = minDate.getFullYear();
    var yearOptions = [];
    var monthOptions = [];
    for (var i = lowerYearLimit; i <= upperYearLimit; i++) {
      yearOptions.push( /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
        value: i,
        children: i
      }, i));
    }
    monthOptions.push(monthNames.map(function (monthName, i) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
        value: i,
        children: monthName
      }, i);
    }));
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "calendar-monthpicker",
      children: [props.showMonthBtn ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "calendar-monthpicker__prevBtn",
        type: "button",
        onClick: function onClick() {
          return decreaseMonth();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: "/svg/caret-left.svg",
          alt: "decrease month"
        })
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "calendar-monthpicker__todayBtn",
        type: "button",
        onClick: function onClick() {
          return setTodayDate();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: "/svg/home.svg",
          alt: "set today date"
        })
      }), props.showMonthAndYearPickers ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "calendar-monthAndYear",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            value: (0, _utils.getMonth)(date),
            onChange: function onChange(e) {
              return changeShownDate(e.target.value, "setMonth");
            },
            children: monthOptions
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            value: (0, _utils.getYear)(date),
            onChange: function onChange(e) {
              return changeShownDate(e.target.value, "setYear");
            },
            children: yearOptions
          })
        })]
      }) : null, props.showMonthBtn ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        className: "calendar-monthpicker__nextBtn",
        type: "button",
        onClick: function onClick() {
          return increaseMonth();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: "/svg/caret-right.svg",
          alt: "increase month"
        })
      }) : null]
    });
  };
  var renderWeekdays = function renderWeekdays() {
    var monthsToSubtract = 0;
    var fromMonthDate = (0, _utils.subMonths)(date, monthsToSubtract);
    var monthDate = (0, _utils.addMonths)(fromMonthDate, 0);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "calendar-datepicker",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "calendar-weekdays",
        children: header(monthDate)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Month.default, {
        day: monthDate,
        calendarStartOn: 0,
        locale: props.defaultLocale,
        minDate: props.minDate,
        maxDate: props.maxDate,
        peekNextMonth: false,
        selectedDate: props.selectedDate,
        onSelect: handleClick
      })]
    });
  };
  if (!props.showCalendar) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "calendar-container",
    ref: ref,
    children: [renderCalendarHeader(), renderWeekdays()]
  });
};
Calendar.protoTypes = {
  defaultLocale: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.object.isRequired,
  maxDate: _propTypes.default.object.isRequired,
  showMonthBtn: _propTypes.default.bool.isRequired,
  showMonthAndYearPickers: _propTypes.default.bool.isRequired,
  onClickOutside: _propTypes.default.func.isRequired,
  showCalendar: _propTypes.default.bool.isRequired,
  selectedDate: _propTypes.default.instanceOf(Date).isRequired,
  onSelect: _propTypes.default.func.isRequired
};
var _default = Calendar;
exports.default = _default;