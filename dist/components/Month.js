"use strict";

var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Week = _interopRequireDefault(require("./Week"));
var _utils = require("../utils/utils");
var _jsxRuntime = require("react/jsx-runtime");
function Month(props) {
  var isWeekInMonth = function isWeekInMonth(startOfWeek) {
    var day = props.day;
    var endOfWeek = (0, _utils.addDays)(startOfWeek, 6);
    return (0, _utils.isSameMonth)(startOfWeek, day) || (0, _utils.isSameMonth)(endOfWeek, day);
  };
  var handleClick = function handleClick(day) {
    props.onSelect(day);
  };
  var renderWeeks = function renderWeeks() {
    var weeks = [];
    var i = 0;
    var currentWeekStart = (0, _utils.getStartOfWeek)((0, _utils.getStartOfMonth)(props.day), props.locale, props.calendarStartOn);
    while (true) {
      weeks.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Week.default, {
        day: currentWeekStart,
        calendarStartOn: props.calendarStartOn,
        month: (0, _utils.getMonth)(props.day),
        locale: props.locale,
        minDate: props.minDate,
        maxDate: props.maxDate,
        selectedDate: props.selectedDate,
        onSelect: handleClick
      }, i));
      i++;
      currentWeekStart = (0, _utils.addWeeks)(currentWeekStart, 1);
      if (!isWeekInMonth(currentWeekStart)) {
        break;
      }
    }
    return weeks;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "calendar-weeks",
    children: renderWeeks()
  });
}
Month.protoTypes = {
  locale: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.object.isRequired,
  maxDate: _propTypes.default.object.isRequired,
  selectedDate: _propTypes.default.instanceOf(Date).isRequired,
  onSelect: _propTypes.default.func.isRequired,
  day: _propTypes.default.instanceOf(Date).isRequired,
  calendarStartOn: _propTypes.default.number.isRequired,
  peekNextMonth: _propTypes.default.bool.isRequired
};
var _default = Month;
exports.default = _default;