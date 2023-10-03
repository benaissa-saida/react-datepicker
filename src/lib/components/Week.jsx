import { getStartOfWeek, addDays } from "../utils/utils";
// import DayTest from "./DayTest";
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
      [0, 1, 2, 3, 4, 5, 6].map((i) => {
        const day = addDays(startOfWeek, i);
        return (
          <Day
            key={day.valueOf()}
            day={day}
            month={props.month}
            minDate={props.minDate}
            maxDate={props.maxDate}
            locale={props.locale}
            selected={props.selected}
            onSelect={handleClick.bind(this, day)}
          />
        );
      })
    );
  };

  return (
    <div>
      <span className="week">{renderDays()}</span>
    </div>
  );
}

export default Week;
