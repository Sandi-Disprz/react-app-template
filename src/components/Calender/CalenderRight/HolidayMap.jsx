import React, { useEffect, useState } from "react";

function HolidayMap({ holiday }) {
  const holidayStyle = {
    position: "relative",
    // left: `${(spread+30)}px`,
    height: `20px`,
    backgroundColor: "var(--bg-primary)",
    color: "white",
    // width:`${10*length}px`,
    textAlign: "center",
    borderRadius: "4px",
    padding: "5px",
  };

  return (
    <div style={holidayStyle}>
      <p> ( {holiday} ) </p>
    </div>
  );
}

export default HolidayMap;
