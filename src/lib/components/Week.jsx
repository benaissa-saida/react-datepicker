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

    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(startOfWeek, offset);
        return (
          <Day
            key={day.valueOf()}
            day={day}
            month={props.month}
            minDate={props.minDate}
            maxDate={props.maxDate}
            monthShowsDuplicateDaysEnd={props.monthShowsDuplicateDaysEnd}
            monthShowsDuplicateDaysStart={props.monthShowsDuplicateDaysStart}
            locale={props.locale}
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
