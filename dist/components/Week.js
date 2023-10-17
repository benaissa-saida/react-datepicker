"use strict";

var _interopRequireDefault = require("/Users/mikasa/Desktop/library-react/mik-datepicker/node_modules/.pnpm/@babel+runtime@7.22.15/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils/utils");
var _Day = _interopRequireDefault(require("./Day"));
var _jsxRuntime = require("react/jsx-runtime");
function Week(props) {
  var _this = this;
  var renderDays = function renderDays() {
    var startOfWeek = (0, _utils.getStartOfWeek)(props.day, props.locale, props.calendarStartOn);
    var days = [];
    var handleClick = function handleClick(day) {
      props.onSelect(day);
    };
    return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (amount) {
      var day = (0, _utils.addDays)(startOfWeek, amount);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Day.default, {
        day: day,
        month: props.month,
        minDate: props.minDate,
        maxDate: props.maxDate,
        locale: props.locale,
        selectedDate: props.selectedDate,
        onSelect: handleClick.bind(_this, day)
      }, day.valueOf());
    }));
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "calendar-week",
    children: renderDays()
  });
}
Week.protoTypes = {
  locale: _propTypes.default.object.isRequired,
  minDate: _propTypes.default.object.isRequired,
  maxDate: _propTypes.default.object.isRequired,
  selectedDate: _propTypes.default.instanceOf(Date).isRequired,
  onSelect: _propTypes.default.func.isRequired,
  day: _propTypes.default.instanceOf(Date).isRequired,
  calendarStartOn: _propTypes.default.number.isRequired,
  key: _propTypes.default.number,
  month: _propTypes.default.number.isRequired
};
var _default = Week;
exports.default = _default;