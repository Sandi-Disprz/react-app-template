import {React} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight,faChevronCircleRight,faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import '../CalenderLeftStyles/CalenderYear.scss'
import { monthTitleList } from "../../../DAYS_MONTHS";

function CalendarYear(props) {
  
  const addYearClick = (event) => {
    props.setYearChange(true)
    props.setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    props.changeDate((prevState) => {
      return new Date(
        prevState.getFullYear() + 1,
        prevState.getMonth(),
        prevState.getDate()
      );
    });
  };

  const minusYearClick = (event) => {
    props.setYearChange(true)
    props.setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    props.changeDate((prevState) => {
      return new Date(
        prevState.getFullYear() - 1,
        prevState.getMonth(),
        prevState.getDate()
      );
    });
  };

  const minusMonthClick = (event) => {
    props.setYearChange(true)
    props.setChangeDay(false);
    props.setReset(true);

    // props.setRemove(true);
    props.changeDate((prevState) => {
      let month = prevState.getMonth() - 1,
        year = prevState.getFullYear();
      if (month <= 0) {
        month = 11;
        year--;
      }
      return new Date(year, month, prevState.getDate());
    });
  };
  const addMonthClick = (event) => {
    props.setYearChange(true)
    props.setChangeDay(false);
    props.setReset(true);
    // props.setRemove(true);
    // consider Add Month will affect Year
    props.changeDate((prevState) => {
      let month = prevState.getMonth() + 1,
        year = prevState.getFullYear();
      if (month > 12) {
        month = 1;
        year++;
      }
      return new Date(year,month, prevState.getDate());
    });
  };
  return (
    <div className="year-bar">

      <button onClick={minusYearClick} className="prev-year">
        <FontAwesomeIcon icon={faChevronLeft} size='1x' className="icon-chlt"></FontAwesomeIcon>
      </button>

      <button className="tool-tip">Previous Year</button>

      <button onClick={addYearClick} className="next-year">
        <FontAwesomeIcon icon={faChevronRight} size='1x' className="icon-chrt"></FontAwesomeIcon>
      </button>

      <button className="tool-tip">Next Year</button>

     <p className="months">{monthTitleList[props.month]}</p>
    

    <p className="year">{props.year}</p>
      

      <button onClick={minusMonthClick} className="prev-month">
        <FontAwesomeIcon icon={faChevronCircleLeft} className='icon-chclt'></FontAwesomeIcon>
      </button>

      <button className="tool-tip">Previous Month</button>

      <button onClick={addMonthClick} className="next-month">
        <FontAwesomeIcon icon={faChevronCircleRight} className='icon-chcrt'></FontAwesomeIcon>
      </button>
      <button className="tool-tip">Next Month</button>
    </div>
  );
}

export default CalendarYear;
