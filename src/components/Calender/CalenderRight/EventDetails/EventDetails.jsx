import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deleteAudio from '../../../../assets/click-delete.mp3';
import "./EventDetails.scss";
import {
  faTrashCan,
  faCircleXmark,
  faBookOpenReader,
  faCalendarDays,
  faClock,
  faBarsProgress,
  faPen,
  faList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import EditBox from "../EditBox/EditBox";
import { ViewWrapper } from "../../Calender";
function EventDetails({
  eventData,
  setShowEventDetails,
  setShowDetails,
  setShowPosted,
  updateBox,
  setUpdateBox,
  showEventDetails,
}) {
  const { setDelete } = useContext(ViewWrapper);
  const startdate = eventData.startTime
    .substring(0, 10)
    .split("-")
    .reverse("")
    .join("/");
  const endDate = eventData.endTime
    .substring(0, 10)
    .split("-")
    .reverse("")
    .join("/");
  const eventStart = eventData.startTime.substring(11, 16);
  const eventEnd = eventData.endTime.substring(11, 16);
  const eventDesc = eventData.eventDescription;
  const [move, setMove] = useState(false);
  var startnoon, endnoon;
  if (new Date(eventData.startTime).getHours() > 12) {
    startnoon = "PM";
  } else {
    startnoon = "AM";
  }
  if (new Date(eventData.endTime).getHours() > 12) {
    endnoon = "PM";
  } else {
    endnoon = "AM";
  }

  // console.log(startdate==endDate);
  const removeDetailPopup = () => {
    setShowEventDetails(false);
    setMove(false);
  };
  const handleDelete = (id) => {
    new Audio(deleteAudio).play();
    setShowDetails(true);
    setShowEventDetails(false);
    setDelete(true);
    console.log(id);
    axios
      .delete(`http://localhost:5169/api/appointments/${id}`)
      .then(() => {
        setDelete(false);
      });
  };

  // const updateShow=()=>{
  //     console.log("update");
  //     setUpdateBox(true);
  // }
  // console.log(updateBox);
  return (
    <>
      <div
        className={`add-events-background  ${
          showEventDetails && !move && "back-trans"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></div>
      <div
        className={`event-details ${showEventDetails && "details-anim"} ${
          move && "move-bottom"
        }`}
      >
        <div className="event-details-head">
          <FontAwesomeIcon
            icon={faBarsProgress}
            onClick={() => {
              setMove(!move);
            }}
            className="move-to"
          />
          {move ? (
            <p className="tool-tip">Move to up</p>
          ) : (
            <p className="tool-tip">Move to bottom</p>
          )}
          <h5>details</h5>
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => {
              setUpdateBox(true);
            }}
            className="edit"
          />
          <span title="Delete event">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => handleDelete(eventData.startTime)}
              className="delete"
            />
          </span>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={removeDetailPopup}
            className="cancel-btn"
          />
          <p className="tool-tip">Close</p>
        </div>
        <div className="event-data">
          <div className="show-detail">
            <FontAwesomeIcon icon={faBookOpenReader} />
            <span>Title</span> : <h5> {eventData.eventName}</h5>
          </div>
          <div className="show-detail">
            <FontAwesomeIcon icon={faCalendarDays} />
            {startdate === endDate ? (
              <p> Date : {startdate}</p>
            ) : (
              <p>
                {" "}
                Date : {startdate} - {endDate}
              </p>
            )}
          </div>
          <div className="show-detail">
            <FontAwesomeIcon icon={faClock} />
            <p>
              {" "}
              Time : {eventStart}
              {startnoon} - {eventEnd}
              {endnoon} <span>(24 Hour format)</span>
            </p>
          </div>
          {eventDesc.length > 0 ? (
            <div className="show-detail">
              <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
              <p>Description : {eventDesc}</p>
            </div>
          ) : (
            ""
          )}
        {eventData.receiverMail.length>0?(
          <div className="mail-list">
            <FontAwesomeIcon icon={faUsers}/>
            {eventData.receiverMail.map((item)=>{
              return(
                <><p>{item}</p><br/></>
              )
            })}
          </div>
        ):''}
          
        </div>
        
        {/* {updateBox?( */}
        <EditBox
          updateBox={updateBox}
          eventData={eventData}
          setUpdateBox={setUpdateBox}
          setShowPosted={setShowPosted}
          setShowEventDetails={setShowEventDetails}
        />
        {/* ):''} */}
      </div>
    </>
  );
}

export default EventDetails;
