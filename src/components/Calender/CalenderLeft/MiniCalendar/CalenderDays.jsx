import React, { useContext } from "react";
import "./CalenderDays.scss";
import { ContextWrapper } from "../../Calender";
function CalendarDays({ reset, setReset }) {
  const {
    selectedDate,
    setSelectedDate,
    setChangeDay,
    setYearChange,
    setEvent,
  } = useContext(ContextWrapper);
  const updateDay = (event) => {
    const { year, month, selectedDate } = event.target.attributes;
    const newDate = new Date(year.value, month.value, selectedDate.value);
    setSelectedDate(newDate);
    setChangeDay(true);
    setYearChange(false);
    setReset(false);
    setEvent(false);
  };
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  var check = false;
  var c_month, c_year;
  if (!check) {
    c_month = selectedMonth;
    c_year = selectedYear;
    check = true;
  }
  const preDayCount =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  const prevDays = Array.from(new Array(preDayCount), (elem, index) =>
    // new Date(firstDayOfMonth - 86400000 * (preDayCount - index)).getDate()
    new Date(firstDayOfMonth.getFullYear(),firstDayOfMonth.getMonth(),-(preDayCount-index-1)).getDate()
  );

  const prevDayList = prevDays.map((elem, index) => {
    return (
      <button className="btn-days prev-month">
        <li key={index} className="">
          {elem}{" "}
        </li>
      </button>
    );
  });
  var nextDays;

  const thisDays = Array.from(
    new Array(lastDayOfMonth.getDate()),
    (elem, index) => index + 1
  );

  const dateNow = new Date();
  const thisDayList = thisDays.map((elem, index) => {
    return (
      <button
        className={`btn-days this-month  ${
          elem === dateNow.getDate() &&
          c_month === dateNow.getMonth() &&
          c_year === dateNow.getFullYear()
            ? "selected"
            : ""
        } ${
          elem === selectedDate.getDate() &&
          elem !== dateNow.getDate() &&
          !reset
            ? "current"
            : ""
        }`}
        onClick={updateDay}
      >
        <li
          key={index}
          year={selectedYear}
          month={selectedMonth}
          selectedDate={elem}
        >
          {elem}
        </li>
      </button>
    );
  });
  if (
    firstDayOfMonth.getDay() > 0 &&
    firstDayOfMonth.getDay() < 6 &&
    lastDayOfMonth.getDay() !== 0
  ) {
    nextDays = Array.from(
      new Array(14 - lastDayOfMonth.getDay()),
      (elem, index) => index + 1
    );
  } else {
    nextDays = Array.from(
      new Array(7 - lastDayOfMonth.getDay()),
      (elem, index) => index + 1
    );
  }
  const nextDayList = nextDays.map((elem, index) => {
    return (
      <button className="btn-days next-month">
        <li key={index}>{elem}</li>
      </button>
    );
  });

  return (
    <div>
      <ul className="days mw-350px">
        {prevDayList}
        {thisDayList}
        {nextDayList}
      </ul>
    </div>
  );
}

export default CalendarDays;
