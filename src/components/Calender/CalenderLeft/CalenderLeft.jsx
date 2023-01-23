import { React } from "react";
import "./CalenderLeft.scss";
import MiniCalender from "./MiniCalendar/MiniCalender";
import Event from "./EventButton/EventButton";
import DisprzHolidays from "./DisprzHolidays/DisprzHolidays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function CalenderLeft() {
  var i=0;
  return (
    <div className="calender-left">
      <Event />
      <MiniCalender />
      <DisprzHolidays i={i}/>
      {/* <button class="glow-on-hover" type="button">
        <h4 className='event-tag'>Create</h4>
        <FontAwesomeIcon icon={faPlus} className='plus'/>
      </button> */}
    </div>
  );
}

export default CalenderLeft;
