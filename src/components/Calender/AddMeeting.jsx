import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBarsProgress,faCircleXmark} from'@fortawesome/free-solid-svg-icons'
import React, { useState,useEffect,useCallback,useRef } from 'react';
import moment from 'moment';
import './AddMeeting.scss'
function AddMeeting({event,setEvent,endTime,selectedDate,startTime,title,desc,setTitle,setStartTime,setEndTime,setDesc,handleSubmit,shake,setShake}) {
  const [alert,setAlert]=useState(false);
  console.log(startTime,)

  const confirmDelete=()=>{
    setEvent(false);
    setShow(false);
    setAlert(false);
    setTitle('');
    setStartTime('');
    setEndTime('');
    setDesc('');
  }
  const removeEvent=()=>{
    if(title || startTime || endTime){
      setAlert(true);
    }
    else{
      setEvent(false);
      setShow(false);
    }
  }
  const [show,setShow]=useState(false);
  const showtip=()=>{
    setShow(true);
    console.log("im in")
  }
  const removeTip=()=>{
    setShow(false);
  }
  const removeShake=()=>{
    setShake(false);
  }
  const modalRef=useRef()
  const closeModal= (e) =>{
    if(modalRef.current === e.target){
      setAlert(!alert);
    }
  }
  const keyPress=useCallback(e=>{
    if (e.key==='Escape' && alert){
      setAlert(false)
    }
  },[setAlert,alert])

  useEffect(()=>{
    console.log('first')
    document.addEventListener('keydown',keyPress);
    return ()=>{ document.removeEventListener('keydown',keyPress)
    console.log('called')
  }
  },[keyPress])
  return (
    <>
    <div className={`add-meeting ${event?'add-animation':''} ${shake?'shake':''}`}>
      <div className='meeting-head trans-right'>
        <FontAwesomeIcon icon={faBarsProgress} className="move-to-side" /><button className='tool-tip'>Move To Side</button>
        <header className='meeting-title'>
          Add Meeting
        </header>
        <button className='spin-btn'><FontAwesomeIcon icon={faCircleXmark} className="cancel-event" onClick={removeEvent} onMouseOver={showtip} onMouseLeave={removeTip}></FontAwesomeIcon></button>
        <button className={`tool-tip ${show?'add-tool':''}`}>close</button>
      </div>
      <div className='set-meet'>
        <div className='row-details'>
          <h4>Event Name :</h4>
          <input type='text' placeholder='Add Title' className='title-box' value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className='row-details'>
          <h4>StartTime :</h4>
          <input type="datetime-local" id="meeting-time"
           name="meeting-time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} className='title-box'/>
        </div>
        <div className='row-details'>
          <h4>EndTime :</h4>
          <input type="datetime-local" id="meeting-time"
           name="meeting-time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} className='title-box'/>
        </div>
        <div className='row-details'>
          <h4>Description :</h4>
          <input type='text' placeholder='Add Description' className='title-box' value={desc} onChange={(e)=>setDesc(e.target.value)} />
        </div>
        <div className='row-details'>
          <button className='btn add' onClick={handleSubmit} onMouseOut={removeShake}>Save</button>
          <button onClick={removeEvent} className="btn cancel ">discard</button>
        </div>
      </div>
    </div>
    {alert?
      <div className='popup-delete-event' ref={modalRef} onClick={closeModal}>
        <h4 className='popup-head trans-right'>You want to remove the changes..?</h4>
        <div className='pair-buttons'>
          <button className='btn add' onClick={()=>setAlert(false)} > Keep Changes</button>
          <button className='btn cancel' onClick={confirmDelete}>Discard</button>
        </div>
    </div>:''}
    </>
  )
}

export default AddMeeting;
