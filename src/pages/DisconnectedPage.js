import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "./stream.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: 150,
    color: "rgba(255,246,240,1)",
    backgroundColor: "#8f8f8f",
    "&:hover": {
      backgroundColor: "#7a7a7a",
    },
  },
});

const DisconnectPage = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className='stream-page'>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Someone else has logged in with your account</h1>
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
