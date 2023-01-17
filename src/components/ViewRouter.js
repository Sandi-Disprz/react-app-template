import React from "react";
import { Routes, Route } from "react-router-dom";
import { VIEWPATH } from "../RoutePath";
function ViewRouter() {
  return (
    <>
      {VIEWPATH.map((route) => {
        return (
          <Routes>
            <Route path={route.path} element={route.component} />
          </Routes>
        );
      })}
    </>
  );
}

export default ViewRouter;
