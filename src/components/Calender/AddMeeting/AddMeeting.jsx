import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faCircleXmark,faPlus,faXmark
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./AddMeeting.scss";
import moment from "moment";
import TextArea from "react-textarea-autosize";
function AddMeeting({
  event,
  setEvent,
  endTime,
  startTime,
  title,
  desc,
  setTitle,
  setStartTime,
  selectedDate,
  setEndTime,
  setDesc,
  handleSubmit,
  shake,
  setShake,
  conflictAlert,
  remindAlert,
  setRemainder,mail,setMail,mailList,setMailList
}) {
  const [alert, setAlert] = useState(false);
  const dateNow = new Date();
  var prevStart = startTime,
    prevEnd = endTime;
  console.log(prevEnd, prevStart);
  const confirmDelete = () => {
    setEvent(false);
    setShow(false);
    setAlert(false);
    setTitle("");
    setStartTime(moment(dateNow).format("yyyy-MM-DDTHH:mm"));
    setEndTime(
      moment(dateNow)
        .add(moment.duration(30, "minutes"))
        .format("yyyy-MM-DDTHH:mm")
    );
    setDesc("");
  };
  const removeEvent = () => {
    if (title || startTime !== prevStart || endTime !== prevEnd) {
      setAlert(true);
    } else {
      setStartTime(moment(dateNow).format("yyyy-MM-DDTHH:mm"));
      setEndTime(
        moment(dateNow)
          .add(moment.duration(30, "minutes"))
          .format("yyyy-MM-DDTHH:mm")
      );
      setEvent(false);
      setShow(false);
    }
  };
  const [show, setShow] = useState(false);
  const showtip = () => {
    setShow(true);
  };
  const removeTip = () => {
    setShow(false);
    setRemainder(false);
  };
  const removeShake = () => {
    setShake(false);
  };
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setAlert(!alert);
    }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && alert) {
        setAlert(false);
      }
    },
    [setAlert, alert]
  );
  const addMail=()=>{
    // const keymail={
    //   key:uuid(),
    //   Name:mail
    // }
    const newmail=[mail,...mailList]
    setMailList(newmail);
    setMail('');
  }
  const removeMail=(key)=>{
    const newList=mailList.filter((item,index)=>index!==key);
    setMailList(newList);
  }
  const mailStyle={
    fontSize:`${mailList.length<5?14:8}px`
  }
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);
  return (
    <>
      <div
        className={`add-meeting ${event ? "add-animation" : ""} ${
          shake ? "shake" : ""
        }`}
      >
        <div className="meeting-head trans-right">
          <FontAwesomeIcon icon={faBarsProgress} className="move-to-side" />
          <button className="tool-tip">Move to side</button>

          <header className="meeting-title">Add Meeting</header>

          <button className="spin-btn">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="cancel-event"
              onClick={conflictAlert ? remindAlert : removeEvent}
              onMouseOver={showtip}
              onMouseLeave={removeTip}
            ></FontAwesomeIcon>
          </button>

          <button className={`tool-tip ${show ? "add-tool" : ""}`}>
            Close
          </button>
        </div>
        <div className="set-meet">
          <div className="row-details">
            <h5 className="form-title" id="event-name">
              :
            </h5>
            <input
              type="text"
              placeholder="Add Title"
              className="title-box"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="row-details">
            <h5 className="form-title" id="start-time">
              :
            </h5>
            <input
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="title-box"
            />
          </div>

          <div className="row-details">
            <h5 className="form-title" id="end-time">
              :
            </h5>
            <input
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="title-box"
            />
          </div>
          <div className="row-details">
            <h5 className="form-title" id="desc">
              :
            </h5>
            <TextArea
              type="text"
              minRows={2}
              maxRows={4}
              placeholder="Add description ..."
              className="type-box"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="row-details">
            <h5 className="form-title" id="mail">
              :
            </h5>
            <input
              type="text"
              id="mail-name"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="title-box"
            />
            <FontAwesomeIcon icon={faPlus} className='add-mail' onClick={addMail}/>
          </div>
          <div className="mail-details">
            {mailList.map((currMail,index)=>{
              return(
              <div style={mailStyle}className="mail-box" key={index}>{currMail}<FontAwesomeIcon icon={faXmark} onClick={()=>removeMail(index)}/></div>)
            })}
          </div>
          <div className="btn-details">
            <button
              className="btn add"
              onClick={handleSubmit}
              onMouseOut={removeShake}
            >
              Save
            </button>
            <button onClick={removeEvent} className="btn cancel ">
              Discard
            </button>
          </div>
        </div>
      </div>

      {alert ? (
        <div className="popup-delete-event" ref={modalRef} onClick={closeModal}>
          <h4 className="popup-head trans-right">
            You want to remove the changes..?
          </h4>
          <div className="pair-buttons">
            <button className="btn1 add" onClick={() => setAlert(false)}>
              {" "}
              Keep Changes
            </button>
            <button className="btn1 cancel" onClick={confirmDelete}>
              Discard
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddMeeting;
