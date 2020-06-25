import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermissionAndName } from "../store/user/selectors";
import IframeResizer from "iframe-resizer-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./stream.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255,246,240,0.8)",
    padding: "50px 30px 30px 30px",
    marginBottom: 100,
  },
  button: {
    color: "rgba(255,246,240,1)",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#454545",
    },
  },
});

const StreamPage = () => {
  const { permission, fullName, email } = useSelector(
    getStreamPermissionAndName
  );
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    console.log(permission);
    if (!permission && !fullName) {
      history.push("/disconnected");
    } else if (!permission) {
      history.push("/disconnected");
    }
  }, [permission, fullName, history]);

  const onButtonClick = () => {
    setFullScreen(!fullScreen);
  };

  const containerStyle = fullScreen
    ? { height: "100%", width: "100%" }
    : { height: "60%", width: "70%" };

  const barClassName = fullScreen ? "bar-fullscreen" : "bar";
  const buttonClassName = fullScreen
    ? "button-fullscreen"
    : "button-smallscreen";

  const buttonText = fullScreen ? "Minimize" : "Fullscreen";

  return (
    <div className='stream-page'>
      <div className='center-it' style={containerStyle}>
        <span className={`${barClassName}`}>
          {fullName} - {email}
        </span>
        <IframeResizer
          log
          src='https://player.vimeo.com/video/431795434'
          style={{
            width: "100%",
            minWidth: "100%",
            height: "100%",
            position: "relative",
          }}
          frameBorder='0'
        />
        <Button
          variant='contained'
          className={`${buttonClassName}`}
          style={{
            maxWidth: "120px",
            maxHeight: "32px",
            minWidth: "120px",
            minHeight: "32px",
          }}
          classes={{ contained: classes.button }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default StreamPage;
