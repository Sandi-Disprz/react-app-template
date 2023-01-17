import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { ContextWrapper } from "../../Calender";
import "./Event.scss";
function Event() {
  const { AddEvent } = useContext(ContextWrapper);
  return (
    <div className="event-btn" onClick={AddEvent}>
      <h4 className="event-tag">Create</h4>
      <FontAwesomeIcon icon={faPlus} className="plus-logo" />
    </div>
  );
}

export default Event;
