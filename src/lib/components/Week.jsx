import PropTypes from "prop-types";
import { getStartOfWeek, addDays } from "../utils/utils";
import Day from "./Day";

function Week(props) {
  const renderDays = () => {
    const startOfWeek = getStartOfWeek(
      props.day,
      props.locale,
      props.calendarStartOn
    );
    const days = [];

    const handleClick = (day) => {
      props.onSelect(day);
    };

    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map((amount) => {
        const day = addDays(startOfWeek, amount);
        return (
          <Day
            key={day.valueOf()}
            day={day}
            month={props.month}
            minDate={props.minDate}
            maxDate={props.maxDate}
            locale={props.locale}
            selectedDate={props.selectedDate}
            onSelect={handleClick.bind(this, day)}
          />
        );
      })
    );
  };

  return <div className="calendar-week">{renderDays()}</div>;
}

Week.protoTypes = {
  locale: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  calendarStartOn: PropTypes.number.isRequired,
  key: PropTypes.number,
  month: PropTypes.number.isRequired,
};

export default Week;
