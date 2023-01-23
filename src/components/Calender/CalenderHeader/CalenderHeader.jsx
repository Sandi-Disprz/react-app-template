import { React, useContext, useState, useEffect } from "react";
import "./CalenderHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/timetable.png";
import image from "../images/christmas-banner.png";
import { monthTitleList } from "../../../DAYS_MONTHS";
import { ContextWrapper } from "../Calender";
import { NavLink } from "react-router-dom";
function Dashborad({ theme, setTheme, setShowSearch }) {
  const { selectedDate, setSelectedDate, changeday, setChangeDay, yearChange } =
    useContext(ContextWrapper);
  const dateNow = new Date();
  const datee = selectedDate.getDate();
  const month = monthTitleList[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();
  const [dayview, setDayView] = useState(true);
  const [agendaview, setAgendaView] = useState(false);

  var [timedate, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const activeDay = () => {
    setDayView(true);
    setAgendaView(false);
  };

  const activeAgenda = () => {
    setDayView(false);
    setAgendaView(true);
  };
  const changeTheme = () => {
    setTheme(!theme);
  };
  const changeToday = () => {
    setChangeDay(false);
    setSelectedDate((current) => {
      const newDate = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate()
      );
      return newDate;
    });
  };

  return (
    <div
      className="content-header  trans-left"
      style={{ backgroundImage: theme ? `url(${image})` : "" }}
    >
      {/* <FontAwesomeIcon icon={faBars} className='ham-menu'  /><p className='ham-content'>menu</p> */}
      <a href="http://localhost:3000/">
        <img
          src={logo}
          className="calender-logo"
          alt="{https://www.flaticon.com/free-icon/timetable_1048953?related_id=1048953&origin=tag} "
        />
      </a>
      <p className="calendar-name">Sanz-Calender</p>
      <button
        onClick={changeToday}
        className={`today-btn  ${theme ? "change-color" : ""}`}
      >
        Today
      </button>
      {yearChange === false ? (
        <>
          {changeday ? (
            <div className="current-day">
              <p className="current-month">{month} </p>
              <p className="current-date">{datee} , </p>
              <p className="current-year">{year}</p>
            </div>
          ) : (
            <div className="current-day">
              <p className="current-month">
                {monthTitleList[dateNow.getMonth()]}
              </p>
              <p className="current-date">{dateNow.getDate()} , </p>
              <p className="current-year">{dateNow.getFullYear()}</p>
            </div>
          )}
        </>
      ) : (
        <div className="current-day">
          <p className="current-month">{monthTitleList[dateNow.getMonth()]}</p>
          <p className="current-date">{dateNow.getDate()} ,</p>
          <p className="current-year">{dateNow.getFullYear()}</p>
        </div>
      )}
      {/* <FontAwesomeIcon icon ={faChevronRight} color='white'/> */}

      {/* <p className='theme-content'>changeTheme</p> */}
      <button className='today-btn trans' onClick={()=>setShowSearch(true)}>Search</button>
      <div className="view-buttons">
        <NavLink to={"/"}>
          <button
            className={`day-btn  ${dayview && "current-view"}`}
            onClick={activeDay}
          >
            Day
          </button>
        </NavLink>
        <NavLink to={"agenda-view"}>
          <button
            className={`agenda-btn ${agendaview && "current-view"}`}
            onClick={activeAgenda}
          >
            Agenda
          </button>
        </NavLink>
      </div>
      <p className="current-time">{timedate.toLocaleTimeString()}</p>
      <FontAwesomeIcon
        icon={faSnowflake}
        className="theme"
        onClick={changeTheme}
        title="change theme"
      />
    </div>
  );
}
export default Dashborad;
