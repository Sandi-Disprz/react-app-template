import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./ConflictBox.scss";
function ConflictBox({ ErrorMessage, CloseConflict, remainder }) {
  
  return (
    <>
    {console.log("error on update")}
    
      {ErrorMessage.response ? (
        <div className={`conflict-box ${remainder ? "shake" : ""}`}>
          <div className="box-head">
            <h4 className="conflict-head">Conflict Alert</h4>
            <FontAwesomeIcon
              icon={faXmark}
              className="close-btn"
              onClick={CloseConflict}
            ></FontAwesomeIcon>
          </div>
          <p className="error-message">{ErrorMessage.response.data.errorMessage}</p>
          {/* <p>ErrorCode:{ErrorMessage.data.statusCode}({ErrorMessage.statusText})</p> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ConflictBox;
