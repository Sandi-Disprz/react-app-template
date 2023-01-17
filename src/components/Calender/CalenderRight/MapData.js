import React, { useState } from "react";

import EventDetails from "./EventDetails/EventDetails";
function MapData({ eventData, setShowDetails, setShowPosted }) {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const handleEventClick = () => {
    setShowEventDetails(true);
    setShowDetails(false);
  };
  const convertStrtodate = (d) => {
    return d.replace("T", " ");
  };
  const start = new Date(convertStrtodate(eventData.startTime));
  const end = new Date(convertStrtodate(eventData.endTime));
  const eventStart = start.getHours() + start.getMinutes() / 60;
  const eventEnd = end.getHours() + end.getMinutes() / 60;
  const eventDuration = eventEnd - eventStart;
  const eventStyle = {
    position: "absolute",
    top: `${eventStart * 48}px`,
    height: `${eventDuration * 48}px`,
    backgroundColor: "var(--bg-primary)",
    color: "white",
    width: "90%",
    fontSize:`${(eventDuration>0.1&&eventDuration<0.4)?4:18}px`,
    cursor: "pointer",
  };

  return (
    <>
      <div className={`event ${eventDuration<0.4 && 'expand-event'}`} style={eventStyle} onClick={handleEventClick}>
        <p> ( {eventData.eventName} ) </p>
      </div>
      {/* {showEventDetails?( */}
      <EventDetails
        eventData={eventData}
        showEventDetails={showEventDetails}
        setShowEventDetails={setShowEventDetails}
        setShowDetails={setShowDetails}
        updateBox={updateBox}
        setUpdateBox={setUpdateBox}
        setShowPosted={setShowPosted}
      />
      {/* )
     :' '} */}
    </>
  );
}

export default MapData;
