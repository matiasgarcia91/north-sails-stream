import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "./login.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: 150,
    color: "rgba(0,0,0,1)",
    backgroundColor: "rgba(255,255,255,1)",
    "&:hover": {
      backgroundColor: "#c4c4c4",
    },
  },
});

const DisconnectPage = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className='login'>
      <div style={{ flex: 1.7 }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", textShadow: "2px 2px rgba(0,0,0,0.6)" }}>
          Someone else has logged in with your account
        </h1>
        <Button
          variant='contained'
          classes={{ contained: classes.button }}
          type='submit'
          onClick={() => history.push("/")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default DisconnectPage;
