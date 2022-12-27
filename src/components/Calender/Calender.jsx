
import {React,useState,useEffect} from 'react'
import './Calendar.scss'
import CalenderHeader from '../Calender/CalenderHeader/CalenderHeader'
import CalenderLeft from './CalenderLeft/CalenderLeft'
// import CalenderRight from './CalenderRight/CalenderRight'
import AddMeeting from './AddMeeting'
import {eventDetails} from '../../DAYS_MONTHS.js'
import uuid from 'react-uuid'
import axios from 'axios'
import moment from 'moment'
function Calender() {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default is Today
    const date = new Date();
    return date;
  });
  const [changeday,setChangeDay]=useState(false);
  const [yearChange,setYearChange]=useState(false);
  const [event,setEvent]=useState(false);
  const AddEvent=()=>{
    setEvent(true);
    console.log("called");
  }
  const [title,setTitle]=useState('');
  const [startTime,setStartTime]=useState();
  const [endTime,setEndTime]=useState();
  const [desc,setDesc]=useState('');
  // const [eventdata,setEventData]=useState({})
  const [shake,setShake]=useState(false);
  // const [tempEvent,setTempEvent]=useState([]);
  // const addItems=()=>{
  //   const newEvent={
  //     Key:uuid(),
  //     Title:title,
  //     StartTime:startTime,
  //     EndTime:endTime,
  //     Desc:desc
  //   };
  //   // const newItems=[...eventdata,newEvent]
  //   setEventData(newEvent);
  // }
  console.log(startTime);
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }
  const handleSubmit=(e)=>{
    if(title && startTime&& endTime){
      // addItems();
      var strdate=new Date(startTime);
      var formattedDate=formatDate(strdate).toString();
      console.log(formattedDate);
      axios.post('http://localhost:5169/api/appointments',
      {
      id :uuid(),
      eventName :title,
      startTime:startTime,
      endTime:endTime,
      eventDescription:desc,
      EventDate:formattedDate
      })
      
      setEvent(false);
      setTitle('');
      setStartTime('');
      setEndTime('');
      setDesc('');

    }
    else{
      setShake(true);
    }

  }
  return (
    <div>
      <CalenderHeader 
      date={selectedDate} 
      changeDate={setSelectedDate} 
      changeday={changeday} 
      setChangeDay={setChangeDay}
      yearChange={yearChange} 
      setYearChange={setYearChange} 
      />

      <CalenderLeft date={selectedDate} changeDate={setSelectedDate} changeday={changeday} 
      setChangeDay={setChangeDay} yearChange={yearChange} setYearChange={setYearChange} 
      AddEvent={AddEvent} />
      
      <AddMeeting event={event} setEvent={setEvent} title={title} startTime={startTime}
       endTime={endTime} desc={desc} setTitle={setTitle} setStartTime={setStartTime} selectedDate={selectedDate}
       setEndTime={setEndTime} setDesc={setDesc} handleSubmit={handleSubmit} shake={shake} setShake={setShake}/>
    </div>
  )
}

export default Calender
