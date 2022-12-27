import {React} from 'react';
import '../CalenderLeftStyles/CalenderLeft.scss'
import MiniCalender from'./MiniCalender'
import ShowEvents from './ShowEvents';
import Event from './EventButton';
function CalenderLeft({date,changeDate,changeday,setChangeDay,yearChange,setYearChange,AddEvent,eventData}) {
  return (
    <div className='calender-left'>
      <Event AddEvent={AddEvent}/>
      <MiniCalender Mdate={date} MchangeDate={changeDate} changeday={changeday} 
        setChangeDay={setChangeDay} yearChange={yearChange} setYearChange={setYearChange}
       addEvent={AddEvent} />
      <ShowEvents  eventData={eventData}/>
      
    </div>
  )
}

export default CalenderLeft
