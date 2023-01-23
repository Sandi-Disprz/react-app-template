import axios from "axios";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark,faPlus,faXmark } from "@fortawesome/free-solid-svg-icons";
import "./EditBox.scss";
import { ViewWrapper } from "../../Calender";
import TextArea from "react-textarea-autosize";
import updateAudio from '../../../../assets/success-1-6297.mp3';
import errorAudio from '../../../../assets/error-call-to-attention-129258.mp3';
function EditBox({
  eventData,
  setUpdateBox,
  setShowPosted,
  setShowEventDetails,
  updateBox,
}) {
  const { setErrorMessage, setConflictAlert,ConflictAlert } = useContext(ViewWrapper);

  const [title, setTitle] = useState(eventData.eventName);
  const [startTime, setStartTime] = useState(eventData.startTime);
  const [endTime, setEndTime] = useState(eventData.endTime);
  const [desc, setDesc] = useState(eventData.eventDescription);
  const [mail,setMail]=useState("");
  const [mailList,setMailList]=useState(eventData.receiverMail);
  var formattedDate;
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }

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
  const handleUpdateSubmit = () => {
    var strdate = new Date(eventData.startTime);
    formattedDate = formatDate(strdate).toString();
    axios
      .put(`http://localhost:5169/api/appointments/${formattedDate}`, {
        id: eventData.id,
        eventName: title,
        startTime: startTime,
        endTime: endTime,
        eventDescription: desc,
        receiverMail:mailList
      })
      .then(() => {
        new Audio(updateAudio).play()
        setUpdateBox(false);
        setShowPosted(true);
        setShowEventDetails(false);
      })
      .catch((error) => {
        new Audio(errorAudio).play();
        setErrorMessage(error);
        setConflictAlert(true);
        setUpdateBox(true);
        console.log(error.response);
        setShowPosted(false);
        setStartTime(eventData.startTime);
        setEndTime(eventData.endTime);
      });
  };
  const updateShow=()=>{
    setUpdateBox(false);
  }
  
  return(
    <>
      <div
        className={`add-events-background  ${updateBox && "back-trans"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></div>
      <div className={`update-event ${updateBox && "update-trans"}`}>
        <div className="meeting-head trans-right">
          <header className="meeting-title">Edit Details</header>
          <button className="spin-btn" title="cancel">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="cancel-event"
              onClick={ConflictAlert?'':updateShow}
            ></FontAwesomeIcon>
          </button>
        </div>
        <div className="update-set-meet">
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
          <div className="row-details">
            <button className="btn add" onClick={handleUpdateSubmit}>
              Save
            </button>
            <button onClick={() => setUpdateBox(false)} className="btn cancel ">
              discard
            </button>
          </div>
        </div>
      </div>
    </>
    // document.getElementById("update")
  );
}

export default EditBox;
