import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../Admin.css";

const ResetTab = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", marginTop: 10, marginLeft: 50 }}>
        <label style={{ marginTop: 21, textDecoration: "bold" }}>
          Reset User table in Database
        </label>
        <div style={{ marginLeft: 30, marginTop: 15 }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => console.log("update settings")}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ResetTab;
