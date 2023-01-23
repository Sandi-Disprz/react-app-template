import React, { useContext, useState } from "react";
import CalendarYear from "./CalenderYear";
import CalendarWeek from "./CalenderWeek";
import CalendarDays from "./CalenderDays";
import "./MiniCalendar.scss";
import { ContextWrapper } from "../../Calender";
function CalendarComponent() {
  const [reset, setReset] = useState(false);
  const { selectedDate } = useContext(ContextWrapper);
  const year = selectedDate.getFullYear();

  const month = selectedDate.getMonth();
  return (
    <div className="content">
      <CalendarYear
        year={year}
        month={month}
        reset={reset}
        setReset={setReset}
      />

      <CalendarWeek />

      <CalendarDays reset={reset} setReset={setReset} />
    </div>
  );
}

export default CalendarComponent;
