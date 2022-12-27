import React, { useState } from "react";
import CalendarYear from "./CalenderYear";
import CalendarWeek from "./CalenderWeek";
import CalendarDays from "./CalenderDays";
import '../CalenderLeftStyles/MiniCalendar.scss'
function CalendarComponent({Mdate,MchangeDate,changeday,setChangeDay,yearChange,setYearChange}) {
  const [reset,setReset]=useState(false);
  const year = Mdate.getFullYear();
  
  const month = Mdate.getMonth();
  return (
    
      <div className="content">
       
        <CalendarYear year={year} month={month} changeDate={MchangeDate} changeday={changeday} setChangeDay={setChangeDay} 
        yearChange={yearChange} setYearChange={setYearChange} reset={reset} setReset={setReset}/>
    
        <CalendarWeek />
       
        <CalendarDays date={Mdate} changeDate={MchangeDate} changeday={changeday} setChangeDay={setChangeDay}
         yearChange={yearChange} setYearChange={setYearChange}  reset={reset} setReset={setReset}/>

      
      </div>
  );
}

export default CalendarComponent;
