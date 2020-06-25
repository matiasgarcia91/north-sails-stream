import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermissionAndName } from "../store/user/selectors";
import IframeResizer from "iframe-resizer-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import "./stream.css";

const useStyles = makeStyles({
  button: {
    color: "rgba(255,246,240,1)",
    backgroundColor: "black",
    maxWidth: 120,
    minWidth: 120,
    "&:hover": {
      backgroundColor: "#454545",
    },
  },
  buttonMobile: {
    color: "rgba(255,246,240,1)",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#454545",
    },
    fontSize: 8,
    maxWidth: 80,
    minWidth: 80,
    maxHeight: 30,
    minHeight: 30,
  },
});

const StreamPage = () => {
  const { permission, fullName, email } = useSelector(
    getStreamPermissionAndName
  );
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

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

  const containerStyle = fullScreen ? { height: "100%", width: "100%" } : {};

  const barClassName = fullScreen ? "bar-fullscreen" : "bar";

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
          className={`button`}
          classes={{
            contained: isDesktopOrLaptop
              ? classes.button
              : classes.buttonMobile,
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default StreamPage;
