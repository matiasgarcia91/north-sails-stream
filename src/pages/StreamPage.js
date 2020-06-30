import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermissionAndName } from "../store/user/selectors";
import IframeResizer from "iframe-resizer-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { useMediaQuery } from "react-responsive";
import "./stream.css";

const useStyles = makeStyles({
  button: {
    color: "rgba(255,246,240,1)",
    backgroundColor: "rgba(0,0,0,0.5)",
    minHeight: 35,
    maxHeight: 35,
    maxWidth: 40,
    minWidth: 40,
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
    maxWidth: 40,
    minWidth: 40,
    // maxHeight: 30,
    minHeight: 30,
  },
});

const StreamPage = () => {
  const { permission, fullName, email } = useSelector(
    getStreamPermissionAndName
  );
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState(true);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isHugeScreen = useMediaQuery({
    query: "(min-device-width: 1824px )",
  });

  const classes = useStyles();

  // useEffect(() => {
  //   console.log(permission);
  //   if (!permission && !fullName) {
  //     history.push("/disconnected");
  //   } else if (!permission) {
  //     history.push("/disconnected");
  //   }
  // }, [permission, fullName, history]);

  const onButtonClick = () => {
    setFullScreen(!fullScreen);
  };

  let buttonPositioning = {};
  switch (true) {
    case fullScreen && isHugeScreen:
      buttonPositioning = { left: "-8%", top: "95.5%" };
      break;
    case fullScreen && isDesktopOrLaptop:
      buttonPositioning = { left: "-7%", top: "94%" };
      break;
    default:
      break;
  }

  console.log(isHugeScreen, buttonPositioning);

  const containerStyle = fullScreen ? { height: "100%", width: "100%" } : {};
  // const barClassName = fullScreen ? "bar-fullscreen" : "bar";
  const barClassName = "";

  // const buttonPositioning = fullScreen ? { left: "-10%" } : {};

  return (
    <div
      className='stream-page'
      style={{
        backgroundImage: "url(" + require("../images/stream.jpg") + ")",
      }}
    >
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
          style={buttonPositioning}
          classes={{
            contained: isDesktopOrLaptop
              ? classes.button
              : classes.buttonMobile,
          }}
          onClick={onButtonClick}
        >
          {fullScreen ? (
            <FullscreenExitIcon fontSize='medium' />
          ) : (
            <FullscreenIcon fontSize='medium' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default StreamPage;
