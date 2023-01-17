import { React, useState, useEffect,createContext} from "react";
import "./Calendar.scss";
import CalenderHeader from "../Calender/CalenderHeader/CalenderHeader";
import CalenderLeft from "./CalenderLeft/CalenderLeft";
// import CalenderRight from "./CalenderRight/CalenderRight";
import AddMeeting from "./AddMeeting/AddMeeting";
import uuid from "react-uuid";
import axios from "axios";
import ApiCall from "./NotifyApiCall/ApiCall";
import ConflictBox from "./DialogBox/ConflictBox";
import "../../App.css";
import moment from "moment";
// import AgendaRange from "./RangeAgenda/AgendaRange";
import ViewRouter from "../ViewRouter";

export const ContextWrapper = createContext();
export const ViewWrapper = createContext();
function Calender() {
  // const [value,setValue]=useState(0);

  const [theme, setTheme] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--bg-primary", theme ? "#e35252" : "#87eb94");
    root?.style.setProperty("--bg-primary-thin", theme ? "#f48a8a" : "#63f184");
    root?.style.setProperty(
      "--bg-primary-thick",
      theme ? "#e35252" : "#33d525"
    );
    root?.style.setProperty("--gradient-blue", theme ? "#e38a52" : "#6ce4e4");
    root?.style.setProperty("--gradient-green", theme ? "#e35252" : "#60eab5");
    root?.style.setProperty("--on-bg-primary", theme ? "#de9898" : "#bdefca");
    root?.style.setProperty("--hover-thin", theme ? "#eb9f9f" : "#a9f3b2");
    root?.style.setProperty("--body-background", theme ? "#ffd1d1" : "#d4f2e3");
    root?.style.setProperty("--time-line", theme ? "#ff0000" : "#008000");
  }, [theme]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    return date;
  });

  const [Apidata, setApiData] = useState([]);
  var formattedDate;

  const [changeday, setChangeDay] = useState(false);
  const [yearChange, setYearChange] = useState(false);
  const [event, setEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(
    moment(selectedDate).format("yyyy-MM-DDTHH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment(selectedDate)
      .add(moment.duration(30, "minutes"))
      .format("yyyy-MM-DDTHH:mm")
  );
  const [mail,setMail]=useState("");
  const [mailList,setMailList]=useState([])
  const [desc, setDesc] = useState("");
  const [shake, setShake] = useState(false);
  const [showPosted, setShowPosted] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [conflictAlert, setConflictAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [stime, setTime] = useState("");
  const [deleted, setDelete] = useState(false);
  const checkrange = new Date(selectedDate);
  const checkr = new Date();

  var searchRange;
  if (changeday === true) {
    checkrange.setMonth(checkrange.getMonth() + 1);
    searchRange = new Date(
      checkrange.getFullYear(),
      checkrange.getMonth() + 1,
      0
    );
  } else {
    checkr.setMonth(checkr.getMonth() + 1);
    searchRange = new Date(checkr.getFullYear(), checkr.getMonth() + 1, 0);
    console.log(searchRange);
  }
  // console.log(searchRange);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5169/api/appointments/${formatDate(
          selectedDate
        ).toString()}`
      )
      .then((response) => {
        setApiData(response.data);
        // setStartTime(moment(selectedDate).format("yyyy-MM-DDTHH:mm"));
        // setEndTime(
        //   moment(selectedDate)
        //     .add(moment.duration(30, "minutes"))
        //     .format("yyyy-MM-DDTHH:mm")
        // );
      })
      // .catch(() => {
      //   setStartTime(moment(selectedDate).format("yyyy-MM-DDTHH:mm"));
      //   setEndTime(
      //     moment(selectedDate)
      //       .add(moment.duration(30, "minutes"))
      //       .format("yyyy-MM-DDTHH:mm")
      //   );
      // });
  }, [selectedDate, showPosted, deleted]);

  const AddEvent = () => {
    console.log("called");
    setEvent(true);
    setShowPosted(false);
  };

  useEffect(() => {
    const temp = moment(selectedDate)
      .set("hours", stime)
      .set("minutes", 0)
      .format("yyyy-MM-DDTHH:mm");
    const temp2 = moment(selectedDate)
      .set("hours", stime)
      .set("minutes", 30)
      .format("yyyy-MM-DDTHH:mm");
    setStartTime(temp);
    setEndTime(temp2);
  }, [stime]);

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

  const CloseConflict = () => {
    setConflict(false);
    setConflictAlert(false);
  };
  const handleSubmit = (e) => {
    if (title.replace(/\s/g, "") !== "" && startTime && endTime) {
      var strdate = new Date(startTime);
      formattedDate = formatDate(strdate).toString();
      axios
        .post("http://localhost:5169/api/appointments", {
          id: uuid(),
          eventName: title,
          startTime: startTime,
          endTime: endTime,
          eventDescription: desc,
          receiverMail:mailList
        })
        .catch((error) => {
          setConflict(true);
          setErrorMessage(error);
          setConflictAlert(true);
          setEvent(true);
          setShowPosted(false);
        });
      console.log(errorMessage.code);
      setTitle("");
      setStartTime(moment(selectedDate).format("yyyy-MM-DDTHH:mm"));
      setEndTime(
        moment(selectedDate)
          .add(moment.duration(30, "minutes"))
          .format("yyyy-MM-DDTHH:mm")
      );
      setDesc("");
      setMailList([]);
      if (conflict === false && errorMessage.code !== "ERR_NETWORK") {
        setEvent(false);
        setShowPosted(true);
      }
    } else {
      setShake(true);
    }
  };
  const [remainder, setRemainder] = useState(false);
  const remindAlert = () => {
    setRemainder(true);
  };
  return (
    <ContextWrapper.Provider
      value={{
        selectedDate,
        setSelectedDate,
        changeday,
        setChangeDay,
        yearChange,
        setYearChange,
        AddEvent,
        Apidata,
        setEvent,
      }}
      className=""
    >
      <CalenderHeader
        setShowSearch={setShowSearch}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="body-content-flex">
        <CalenderLeft />
        <ViewWrapper.Provider
          value={{
            setShowDetails,
            showSearch,
            setShowSearch,
            setTime,
            setShowPosted,
            setErrorMessage,
            setDelete,
            setConflictAlert,
            setConflict,
            conflict,
            searchRange,
            showDetails
          }}
        >
          <ViewRouter />
          {/* <CalenderRight/> */}
        </ViewWrapper.Provider>
      </div>

      <AddMeeting
        event={event}
        setEvent={setEvent}
        title={title}
        startTime={startTime}
        endTime={endTime}
        desc={desc}
        setTitle={setTitle}
        setStartTime={setStartTime}
        selectedDate={selectedDate}
        setEndTime={setEndTime} mail={mail} setMail={setMail}
        setDesc={setDesc} mailList={mailList} setMailList={setMailList}
        handleSubmit={handleSubmit}
        shake={shake}
        setShake={setShake}
        conflictAlert={conflictAlert}
        setRemainder={setRemainder}
        remindAlert={remindAlert}   
      />

      {conflictAlert ? (
        <ConflictBox
          ErrorMessage={errorMessage}
          remainder={remainder}
          CloseConflict={CloseConflict}
        />
      ) : (
        ""
      )}
      {!conflictAlert && showPosted ? (
        <ApiCall setShowPosted={setShowPosted} />
      ) : (
        " "
      )}

      {/* {true?<AgendaRange searchRange={searchRange} setAgendaView={setAgendaView} showPosted={showPosted} showDetails={showDetails}/>:''} */}
    </ContextWrapper.Provider>
  );
}

export default Calender;
