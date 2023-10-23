"use strict";

var _interopRequireWildcard = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireWildcard.js").default;
var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./datePicker.css");
var _Calendar = _interopRequireDefault(require("./components/Calendar"));
var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));
var _utils = require("./utils/utils");
var _jsxRuntime = require("react/jsx-runtime");
var DatePicker = function DatePicker(props) {
  var label = props.label,
    placeholder = props.placeholder,
    selected = props.selected,
    onChange = props.onChange;
  var _useState = (0, _react.useState)(""),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    inputVal = _useState2[0],
    setInputVal = _useState2[1];
  var formatDateString = "MM/dd/yyyy";
  var _useState3 = (0, _react.useState)(selected),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    selectedDate = _useState4[0],
    setSelectedDate = _useState4[1];
  var showMonthArrow = true;
  var showMonthAndYearPickers = true;
  var maxDate = (0, _utils.addYears)(new Date(), 27);
  var minDate = (0, _utils.addYears)(new Date(), -100);
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    showCalendar = _useState6[0],
    setShowCalendar = _useState6[1];
  var handleChange = function handleChange(event) {
    var date = (0, _utils.parseDate)(event.target.value, formatDateString, _enUS.default);
    setSelectedDate(date);
    setInputVal(event.target.value);
    if (date) onChange(date);
  };
  var handleSelect = function handleSelect(day) {
    var date = (0, _utils.formatDate)(day, formatDateString, _enUS.default);
    setSelectedDate(day);
    setInputVal(date);
    if (day) onChange(date);
    onDayClicked();
  };
  var onInputClicked = function onInputClicked() {
    setShowCalendar(true);
  };
  var onDayClicked = function onDayClicked() {
    setShowCalendar(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        htmlFor: label,
        children: label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "texte",
        placeholder: placeholder,
        id: label,
        onChange: handleChange,
        onClick: onInputClicked,
        value: inputVal
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Calendar.default, {
      showMonthBtn: showMonthArrow,
      showMonthAndYearPickers: showMonthAndYearPickers,
      maxDate: maxDate,
      minDate: minDate,
      onClickOutside: function onClickOutside() {
        return setShowCalendar(false);
      },
      showCalendar: showCalendar,
      selectedDate: selectedDate,
      onSelect: handleSelect,
      defaultLocale: _enUS.default
    })]
  });
};
DatePicker.protoTypes = {
  label: _propTypes.default.string.isRequired,
  placeholder: _propTypes.default.string.isRequired,
  selected: _propTypes.default.instanceOf(Date).isRequired,
  onChange: _propTypes.default.func.isRequired
};
var _default = DatePicker;
exports.default = _default;