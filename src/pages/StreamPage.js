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
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import "./stream.css";

const StreamPage = () => {
  const { permission, fullName, email } = useSelector(
    getStreamPermissionAndName
  );
  const streamId = useSelector(streamCode);
  const hasWatermark = useSelector(withWatermark);
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState(false);

  // useEffect(() => {
  //   console.log(permission);
  //   if (!permission && !fullName) {
  //     history.push("/disconnected");
  //   } else if (!permission) {
  //     history.push("/disconnected");
  //   }
  // }, [permission, fullName, history]);

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

  return (
    <div className="stream-page">
      <div className="iframe-container" id="el-portador">
        {hasWatermark && (
          <div className="watermark">
            Alexandra Marques - aviz.marques@gmail.com
          </div>
        )}

        <IframeResizer
          log
          src={`https://vimeo.com/event/4018255/embed/236b0de5b2/interaction`}
          // src={`https://player.vimeo.com/video/788725490?title=0`}
          className="iframe-player"
          frameBorder="0"
        />

        {!isIphone && (
          <Button
            variant="contained"
            className="fullscreen-button"
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
