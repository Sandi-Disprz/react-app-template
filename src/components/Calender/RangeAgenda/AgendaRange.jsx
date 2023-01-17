import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { DAYS } from "../../../DAYS_MONTHS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "./RangeAgenda.scss";
import { monthTitleList } from "../../../DAYS_MONTHS";
import { ContextWrapper, ViewWrapper } from "../Calender";
function AgendaRange() {
  const { searchRange, showPosted, showDetails } = useContext(ViewWrapper);
  var fdate = moment(searchRange).format("yyyy-MM-DDTHH:mm");
  //   console.log(searchRange);
  const [rangeData, setRangeData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5169/api/appointments/range/${fdate}`)
      .then((response) => {
        setRangeData(response.data);
      });
  }, [showPosted, showDetails, fdate]);
  const { selectedDate, yearChange, changeday } = useContext(ContextWrapper);
  const datenow = new Date(selectedDate);
  const fromMonth = monthTitleList[datenow.getMonth()].slice(0, 3);
  var toMonth;
  if (datenow.getMonth() > 10) {
    toMonth = monthTitleList[0].slice(0, 3);
  } else {
    toMonth = monthTitleList[datenow.getMonth() + 1].slice(0, 3);
  }
  const year = datenow.getFullYear();
  const dateNow = new Date();
  const fm = monthTitleList[dateNow.getMonth()].slice(0, 3);
  var lm;
  if (dateNow.getMonth() > 10) {
    lm = monthTitleList[0].slice(0, 3);
  } else {
    lm = monthTitleList[dateNow.getMonth() + 1].slice(0, 3);
  }
  //   console.log(changeday);
  return (
    <div className="agenda-view">
      {changeday ? (
        <div className="agenda-head">
          <p className="date-range">
            {" "}
            {fm} - {toMonth} {year}
          </p>
        </div>
      ) : (
        <div className="agenda-head">
          <p className="date-range">
            {" "}
            {fm} - {lm} {dateNow.getFullYear()}
          </p>
        </div>
      )}

      {rangeData.length > 0 ? (
        <>
          {rangeData.map((currentData) => {
            const date = currentData.startTime
              .substring(0, 10)
              .split("-")
              .reverse("")
              .join("-");
            const eventStart = currentData.startTime.substring(11, 16);
            const eventEnd = currentData.endTime.substring(11, 16);
            var eventDesc = currentData.eventDescription;
            const d = currentData.startTime.replace("T", " ");
            const day = DAYS[new Date(d).getDay()];
            var descLength = eventDesc.length;
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

            if (descLength > 30) {
              eventDesc = eventDesc.slice(0, 30);
            }
            return (
              <div className="agenda-box" key={currentData.id}>
                <p className="agenda-date">
                  {day} , {date}{" "}
                </p>
                <div className="agenda-time-period">
                  <FontAwesomeIcon icon={faClock} />
                  <p className="agenda-time-details">
                    {eventStart}
                    {startnoon} - {eventEnd}
                    {endnoon}{" "}
                  </p>
                </div>
                <div className="agenda-title-card">{currentData.eventName}</div>

                {descLength > 15 ? (
                  <div className="agenda-desc">{eventDesc}....</div>
                ) : (
                  <div className="agenda-desc">{eventDesc}</div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AgendaRange;
