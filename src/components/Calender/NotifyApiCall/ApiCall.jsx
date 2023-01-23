import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { React, useState } from "react";
import "./ApiCall.scss";

function ApiCall({ setShowPosted }) {
  const [done, setDone] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);
  var check = false;
  setTimeout(() => {
    setDone(true);
    setTimeout(() => {
      setShowPosted(false);
      setCompleted(true);
    }, 5000);
  }, 2000);

  const clear = () => {
    check = false;
  };
  return (
    <>
      {!completed ? (
        <>
          {!done ? (
            <div className="post-saving">
              <span>Event Saving ...</span>
              <div className="post-spinner" />
            </div>
          ) : (
            <div className={`${!check && "event-completed"}`}>
              <p className="event-saved">Event Saved.</p>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ApiCall;
