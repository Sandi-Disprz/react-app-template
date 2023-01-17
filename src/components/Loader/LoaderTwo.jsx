import { React, useState, useEffect } from "react";
import "./LoaderTwo.scss";
import Calender from "../Calender/Calender";
function LoaderTwo() {
  const [done, setDone] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        setCompleted(true);
      }, 2000);
    }, 2000);
  }, []);
  return (
    <div className={`loader-two ${!done && "bg-color"}`}>
      {!completed ? (
        <>
          {!done ? (
            <div className="spinner">
              <span>loading...</span>
              <div className="half-spinner"></div>
            </div>
          ) : (
            <div className="completed bg-image">
              <p className="welcome p1" id="m1">
                Welcome's
              </p>
              <p className="welcome p2" id="m2">
                {" "}
                San'Z CalendarZ...
              </p>
            </div>
          )}
        </>
      ) : (
        <Calender />
      )}
    </div>
  );
}

export default LoaderTwo;
