import React from 'react'
import EventLists from './EventLists'
import '../CalenderLeftStyles/ShowEvents.scss'
function ShowEvents({eventData}) {
  // console.log(eventData);
  return (
    <div className='show-events'>
        <h3 className='event-head'>Today Events</h3>
        {/* {eventData.map((event)=>{
          return(
            <EventLists key={event.Key} title={event.Title} startTime={event.StartTime} endTime={event.EndTime} desc={event.Desc}/>
          );
        })
        } */}
    </div>
  );
}

export default ShowEvents
