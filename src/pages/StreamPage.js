import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getStreamPermissionAndName,
  streamCode,
  withWatermark,
} from "../store/user/selectors";
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
    minHeight: 30,
  },
});

const StreamPage = () => {
  const { permission, fullName, email } = useSelector(
    getStreamPermissionAndName
  );
  const streamId = useSelector(streamCode);
  const hasWatermark = useSelector(withWatermark);
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState(false);

  const isHugeScreen = useMediaQuery({
    query: "(min-device-width: 1824px) and (min-device-height: 900px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px) and (min-device-height: 755px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-device-width: 768px) and (min-device-height: 1000px)",
  });

  const isIphoneX = useMediaQuery({
    query: "(min-device-width: 375px) and (min-device-height: 800px)",
  });
  const isMobileLarge = useMediaQuery({
    query: "(min-device-width: 414px) and (min-device-height: 700px)",
  });
  const isMobileSmall = useMediaQuery({
    query:
      "(min-device-width: 375px) and (min-device-height: 650px) and (max-device-height: 720px)",
  });
  const isMobileSmallLandscape = useMediaQuery({
    query:
      "(min-device-height: 375px) and (max-device-width: 800px) and (min-device-width: 660px)",
  });
  const isMobileBigLandscape = useMediaQuery({
    query: "(min-device-height: 414px) and (min-device-width: 730px)",
  });
  const isIphoneXLandscape = useMediaQuery({
    query: "(min-device-width: 800px) and (min-device-height: 375px)",
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

  const ua = window.navigator.userAgent;
  const isIphone = ua.indexOf("iPhone") !== -1 && ua.indexOf("Safari") !== -1;

  const onButtonClick = () => {
    if (isIphone) {
    } else {
      if (fullScreen) {
        document.webkitCancelFullScreen();
      } else {
        document.getElementById("el-portador").webkitRequestFullScreen();
      }
      setFullScreen(!fullScreen);
    }
  };

  let buttonPositioning = {};
  if (fullScreen) {
    switch (true) {
      case isHugeScreen:
        buttonPositioning = { left: "-4%", top: "96%" };
        break;
      case isDesktopOrLaptop:
        buttonPositioning = { left: "-4%", top: "91%" };
        break;
      case isTablet:
        buttonPositioning = { left: "-10%", top: "66.5%" };
        break;
      case isMobileBigLandscape:
        buttonPositioning = { left: "-15%", top: "88%" };
        break;
      case isMobileSmallLandscape:
        buttonPositioning = { left: "-10%", top: "86%" };
        break;
      case isIphoneXLandscape:
        buttonPositioning = { left: "-20%", top: "87%" };
        break;
      case isMobileLarge:
        buttonPositioning = { left: "-15%", top: "59.5%" };
        break;
      case isIphoneX:
        buttonPositioning = { left: "-15%", top: "57.5%" };
        break;
      case isMobileSmall:
        buttonPositioning = { left: "-15%", top: "59%" };
        break;
      default:
        break;
    }
  }

  const containerStyle = fullScreen ? { height: "100%", width: "100%" } : {};

  return (
    <div className="stream-page">
      <div className="center-it" style={containerStyle} id="el-portador">
        {hasWatermark && (
          <span className="bar">
            {fullName}-{email}
          </span>
        )}

        <IframeResizer
          log
          // src={`https://player.vimeo.com/video/${streamId}?title=0`}
          src={`https://player.vimeo.com/video/788725490?title=0`}
          style={{
            width: "100%",
            minWidth: "100%",
            height: "100%",
            position: "relative",
          }}
          frameBorder="0"
        />
        {!isIphone && (
          <Button
            variant="contained"
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
              <FullscreenExitIcon fontSize="medium" />
            ) : (
              <FullscreenIcon fontSize="medium" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StreamPage;
