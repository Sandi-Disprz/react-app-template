import React from "react";
import { VIEWBUTTONS } from "../../../RoutePath";
import { NavLink } from "react-router-dom";
function ViewList() {
  return (
    <>
      {VIEWBUTTONS.map((view) => {
        <NavLink to={view.path}>
          <div className="view-button">{view.text}</div>
        </NavLink>;
      })}
    </>
  );
}

export default ViewList;
