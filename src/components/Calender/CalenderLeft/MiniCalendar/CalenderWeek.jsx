import React from "react";
import { weekTitles } from "../../../../DAYS_MONTHS";
import "./CalenderWeek.scss";
function CalenderWeek() {
  return (
    <table className="week-table mw-350">
      {weekTitles.map((value) => {
        return (
          <button className="btn-week">
            <li className="week-name">{value}</li>
          </button>
        );
      })}
    </table>
  );
}

export default CalenderWeek;
