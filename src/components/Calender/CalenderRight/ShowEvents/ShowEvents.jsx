import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { DAYS } from "../../../../DAYS_MONTHS.js";
import DbLoading from "../../images/DbLoader.gif";
import "./ShowEvents.scss";
import axios from "axios";
function ShowEvents({ setShowSearch, SearchRef, searchModal }) {
  const [sendText, setSendText] = useState("");
  const [errorData, setErrorData] = useState("null");
  const [completed, setCompleted] = useState(undefined);
  var type=true;
  useEffect(() => {
    if(searchText.split("-").length==3){
      type=false;
    }
    axios
      .get(`http://localhost:5169/api/appointments/search?search=${sendText}&type=${type?"Name":"date"}`)
      .then((response) => {
        setSearchedData(response.data);
        setErrorData("null");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setErrorData(error.response.data);
        }
      });
  }, [sendText]);

  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const handleSearched = () => {
    setSendText(searchText);
  };
  const removeShow = () => {
    setSearchText("");
    setSendText("");
    setSearchedData([]);
    setShowSearch(false);
  };
  useEffect(() => {
    setCompleted(false);
    setTimeout(() => {
      setCompleted(true);
    }, 3000);
  }, [sendText]);

  return (
    <div className="searched-events" ref={SearchRef} onClick={searchModal}>
      <div className="search-head">
        <button className="left-btn" onClick={removeShow}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
        <div className="input-field">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search.."
            className="search-text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button className="btn-search" onClick={handleSearched}>
          search
        </button>
      </div>

      {errorData === "null" ? (
        <>
          {searchedData.length > 0 ? (
            <>
              {!completed ? (
                <div className="db-load">
                  <img src={DbLoading} className="data-loading" />
                </div>
              ) : (
                <div>
                  {searchedData.map((currentData) => {
                    const date = currentData.startTime
                      .substring(0, 10)
                      .split("-")
                      .reverse("")
                      .join("-");
                    const eventStart = currentData.startTime.substring(11, 16);
                    const eventEnd = currentData.endTime.substring(11, 16);
                    const eventDesc = currentData.eventDescription;
                    const d = currentData.startTime.replace("T", " ");
                    const day = DAYS[new Date(d).getDay()];
                    var startnoon, endnoon;
                    if (new Date(currentData.startTime).getHours() > 12) {
                      startnoon = "PM";
                    } else {
                      startnoon = "AM";
                    }
                    if (new Date(currentData.endTime).getHours() > 12) {
                      endnoon = "PM";
                    } else {
                      endnoon = "AM";
                    }
                    return (
                      <div className="event-box">
                        <p className="event-date">
                          {day} , {date}{" "}
                        </p>
                        <div className="title-card">
                          {currentData.eventName}
                        </div>
                        <div className="time-period">
                          <FontAwesomeIcon icon={faClock} />
                          <p className="time-details">
                            {eventStart}
                            {startnoon} - {eventEnd}
                            {endnoon}{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="empty-show-data">Nothing To Show</div>
          )}
        </>
      ) : (
        <>
          {!completed ? (
            <div className="db-load">
              <img src={DbLoading} className="data-loading" />
            </div>
          ) : (
            <div className="no-data">{errorData}</div>
          )}
        </>
      )}
    </div>
  );
}

export default ShowEvents;
