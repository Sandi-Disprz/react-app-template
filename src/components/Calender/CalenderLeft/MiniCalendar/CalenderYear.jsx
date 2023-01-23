import { React, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./CalenderYear.scss";
import { ContextWrapper } from "../../Calender";
import { monthTitleList } from "../../../../DAYS_MONTHS";

function CalendarYear(props) {
  const { setSelectedDate, setChangeDay, setYearChange } =
    useContext(ContextWrapper);
  const addYearClick = (event) => {
    setYearChange(true);
    setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    setSelectedDate((prevState) => {
      return new Date(
        prevState.getFullYear() + 1,
        prevState.getMonth(),
        prevState.getDate()
      );
    });
  };

  const minusYearClick = (event) => {
    setYearChange(true);
    setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    setSelectedDate((prevState) => {
      return new Date(
        prevState.getFullYear() - 1,
        prevState.getMonth(),
        prevState.getDate()
      );
    });
  };

  const minusMonthClick = (event) => {
    setYearChange(true);
    setChangeDay(false);
    props.setReset(true);

    // props.setRemove(true);
    setSelectedDate((prevState) => {
      let month = prevState.getMonth() - 1,
        year = prevState.getFullYear();
      if (month < 0) {
        month = 11;
        year--;
      }
      return new Date(year, month, prevState.getDate());
    });
  };
  const addMonthClick = (event) => {
    setYearChange(true);
    setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    // consider Add Month will affect Year
    setSelectedDate((prevState) => {
      let month = prevState.getMonth() + 1,
        year = prevState.getFullYear();
      if (month > 12) {
        month = 1;
        year++;
      }
      return new Date(year, month, prevState.getDate());
    });
  };
  return (
    <div className="year-bar">
      <button onClick={minusYearClick} className="prev-year">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="1x"
          className="icon-chlt"
        ></FontAwesomeIcon>
      </button>
      <button className="tool-tip">Previous year</button>

      <button onClick={minusMonthClick} className="prev-month">
        <FontAwesomeIcon
          icon={faAnglesLeft}
          className="icon-chclt"
        ></FontAwesomeIcon>
      </button>
      <button className="tool-tip">Prev month</button>

      <p className="months">{monthTitleList[props.month]}</p>
      <p className="year">{props.year}</p>

      <button onClick={addMonthClick} className="next-month">
        <FontAwesomeIcon
          icon={faAnglesRight}
          className="icon-chcrt"
        ></FontAwesomeIcon>
      </button>
      <button className="tool-tip">Next month</button>
      <button onClick={addYearClick} className="next-year">
        <FontAwesomeIcon
          icon={faChevronRight}
          size="1x"
          className="icon-chrt"
        ></FontAwesomeIcon>
      </button>

      <button className="tool-tip">Next year</button>
    </div>
  );
}

export default CalendarYear;
