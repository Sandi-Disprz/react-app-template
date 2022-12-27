import React from "react";
import '../CalenderLeftStyles/CalenderDays.scss';

function CalendarDays({date,changeDate,changeday,setChangeDay,yearChange,setYearChange,reset,setReset}) {
  
  const updateDay = (event) => {
    const { year, month, date } = event.target.attributes;
    const newDate = new Date(year.value,month.value, date.value);
    changeDate(newDate);
    setChangeDay(true);
    setYearChange(false);
    setReset(false);

  };
  const selectedYear = date.getFullYear();
  const selectedMonth = date.getMonth();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  var check=false;
  var c_month,c_year;
  if(!check){
    c_month=selectedMonth;
    c_year=selectedYear;
    check=true;
  }
  console.log(reset);
  const preDayCount =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  const prevDays = Array.from(new Array(preDayCount), (elem, index) =>
    new Date(firstDayOfMonth - 86400000 * (preDayCount - index)).getDate()
  );

  const prevDayList = prevDays.map((elem, index) => {
    return (
        <button className="btn-days prev-month"><li key={index} className="">{elem} </li></button>
    );
  });

  const thisDays = Array.from(
    new Array(lastDayOfMonth.getDate()),
    (elem, index) => index + 1
  );
  
  const dateNow=new Date();
  const thisDayList = thisDays.map((elem, index) => {
    return (

        <button
    className={`btn-days ${(elem === dateNow.getDate() && c_month===dateNow.getMonth() && c_year===dateNow.getFullYear() )? "selected" : ""} ${(elem === date.getDate() && elem!==dateNow.getDate() && !reset) ? "current":''}`}
        ><li key={index} onClick={updateDay} year={selectedYear}
        month={selectedMonth}
        date={elem}>
          {elem}</li>
        </button>
      
    );
  });

  const nextDays = Array.from(
    new Array(7 - lastDayOfMonth.getDay()),
    (elem, index) => index + 1
  );

  const nextDayList = nextDays.map((elem, index) => {
    return (
      
        <button className="btn-days next-month"><li key={index}>{elem}</li></button>
      
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
