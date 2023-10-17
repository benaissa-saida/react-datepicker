"use strict";

var _interopRequireWildcard = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("../utils/utils");
var _jsxRuntime = require("react/jsx-runtime");
var Day = function Day(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    dayHover = _useState2[0],
    setDayHover = _useState2[1];
  var handleMouseEvent = function handleMouseEvent(event) {
    switch (event.type) {
      case "mouseenter":
        setDayHover(true);
        break;
      case "mouseleave":
        setDayHover(false);
        break;
      default:
        setDayHover(false);
    }
  };
  var isSameDayOfProps = function isSameDayOfProps(other) {
    return (0, _utils.isSameDay)(props.day, other);
  };
  var isAfterMonth = function isAfterMonth() {
    return props.month !== undefined && (props.month + 1) % 12 === (0, _utils.getMonth)(props.day);
  };
  var isBeforeMonth = function isBeforeMonth() {
    return props.month !== undefined && ((0, _utils.getMonth)(props.day) + 1) % 12 === props.month;
  };
  var isCurrentDay = function isCurrentDay() {
    return isSameDayOfProps((0, _utils.newDate)());
  };
  var isSelected = function isSelected() {
    return isSameDayOfProps(props.selectedDate);
  };
  var renderDays = function renderDays() {
    return (0, _utils.getDate)(props.day);
  };
  var handleClick = function handleClick(event) {
    props.onSelect(event);
  };
  var getClasses = function getClasses() {
    return (0, _classnames.default)("day", {
      "outside-month": isAfterMonth() || isBeforeMonth(),
      "current-day": isCurrentDay(),
      "selected-day": isSelected(),
      "hover-day": dayHover
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: getClasses(),
    onMouseEnter: handleMouseEvent,
    onMouseLeave: handleMouseEvent,
    onClick: handleClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: renderDays()
    })
  });
};
Day.protoTypes = {
  locale: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.object.isRequired,
  maxDate: _propTypes.default.object.isRequired,
  selectedDate: _propTypes.default.instanceOf(Date).isRequired,
  onSelect: _propTypes.default.func.isRequired,
  day: _propTypes.default.instanceOf(Date).isRequired,
  key: _propTypes.default.number,
  month: _propTypes.default.number.isRequired
};
var _default = Day;
exports.default = _default;