import React, { useState } from 'react';

function MeetingStat({remainingMeetings, totalMeetings}) {
  const [value, setValue] = useState(remainingMeetings);
  const [range, setRange] = useState((remainingMeetings/totalMeetings)*360);
  return (
    <div className="container" style={{width: "50px", height: "50px", border: "1px solid black", position: "relative"}}>
      <div
        className="range-indicator"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "blue",
          transform: `rotate(${range}deg)`,
          transformOrigin: "center",
          position: "absolute"
        }}
      >
        <input
          type="range"
          min={0}
          max={totalMeetings}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setRange((e.target.value/totalMeetings)*360)
          }}
        />
        <span style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>{value}</span>
      </div>
    </div>
  );
}
export default MeetingStat;