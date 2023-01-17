import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import MapData from "./MapData";
import "./CalenderRight.scss";
import { DAYS, monthTitleList, TIMELINE } from "../../../DAYS_MONTHS";
import ShowEvents from "./ShowEvents/ShowEvents";
import { ContextWrapper, ViewWrapper } from "../Calender";
import axios from "axios";
import HolidayMap from "./HolidayMap";
function CalenderRight() {
  const { selectedDate, AddEvent, Apidata } = useContext(ContextWrapper);
  const { setTime, setShowDetails, setShowPosted, showSearch, setShowSearch } =
    useContext(ViewWrapper);
  const day = DAYS[selectedDate.getDay()];
  const month = monthTitleList[selectedDate.getMonth()].substring(0, 3);
  const year = selectedDate.getFullYear();
  const cDate = selectedDate.getDate();
  const dateNow = new Date().getDate();
  const SearchRef = useRef();
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const [holidayData, setHoliday] = useState([]);
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }
  useEffect(() => {
    axios
      .get(
        `http://localhost:5169/api/appointments/holiday/${formatDate(
          selectedDate
        ).toString()}`
      )
      .then((response) => {
        setHoliday(response.data);
      });
  }, [selectedDate]);
  console.log(holidayData);
  const searchModal = (e) => {
    if (SearchRef.current === e.target) {
      setShowSearch(false);
    }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
      if (e.ctrlKey && e.key === "m" && !showSearch) {
        setShowSearch(true);
      }
    },
    [showSearch, setShowSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);
  const openEvent = (time) => {
    console.log(time);
    setTime(time);
    AddEvent();
  };
  const start = new Date();
  const eventStart = start.getHours() + start.getMinutes() / 60;
  const timeline = {
    position: "absolute",
    top: `${eventStart * 48}px`,
    height: "2px",
    width: "100%",
    borderTop: "3px solid var(--time-line)",
  };

  return (
    <div className="calender-right">
      <div className="day-scheduler">
        <div className="schedule">
          <div className="day-scheduler-split-flex">
            <div className="scheduler-head">
              <div className="time-format">
                <p className="empty"> </p>
                <p className="time-zone">GMT+5.30</p>
              </div>

              <div className="today-date">
                <div className="center-line"></div>
                <div className="date-details">
                  <p className={`date-now ${cDate === dateNow && "add"}`}>
                    {cDate}
                  </p>
                  <p className="day-now">
                    {" "}
                    {day}, {month} {year}
                  </p>
                </div>
                <div className="holiday-flex">
                  {holidayData.length > 0 ? (
                    <>
                      {holidayData.map((holiday) => {
                        return <HolidayMap holiday={holiday} />;
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="scheduler">
              <div className="schedule-split">
                <div className="event-timeline">
                  <div className="time-line">
                    <div className="time-box">
                      {TIMELINE.map((time) => {
                        return (
                          <div className="time">
                            <span className="ftime ctime">{time}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="split-event">
                    <div className="top-line">
                      {TIMELINE.map((time) => {
                        return (
                          <div
                            className="top"
                            key={time}
                            onClick={() => openEvent(time)}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="gap-line"></div>
                    <div className="map-event">{dateNow===cDate?<div className="current-time-line" style={timeline}></div>:''}
                      
                      <div className="top-line">
                        {TIMELINE.map((time) => {
                          return (
                            <div
                              className="top"
                              key={time}
                              onClick={() => openEvent(time)}
                            ></div>
                          );
                        })}
                      </div>
                      {/* <div className='empty-box' ></div> */}
                      <div className="set-events">
                        {Apidata.length > 0 ? (
                          <>
                            {Apidata.map((post) => {
                              return (
                                <MapData
                                  eventData={post}
                                  setShowDetails={setShowDetails}
                                  setShowPosted={setShowPosted}
                                />
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSearch ? (
        <ShowEvents
          setShowSearch={setShowSearch}
          SearchRef={SearchRef}
          searchModal={searchModal}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default CalenderRight;
