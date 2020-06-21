import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermissionAndName } from "../store/user/selectors";
import "./stream.css";

const StreamPage = () => {
  const { permission, fullName } = useSelector(getStreamPermissionAndName);
  const history = useHistory();

  useEffect(() => {
    console.log(permission);
    if (!permission && !fullName) {
      history.push("/disconnected");
    } else if (!permission) {
      history.push("/disconnected");
    }
  }, [permission, fullName, history]);

  return (
    <div className='stream-page'>
      <div className='center-it'>
        <div className='vimeo-container'>
          <iframe
            className='vimeo-player'
            title='oli'
            src='https://player.vimeo.com/video/431197906'
            frameBorder='0'
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ marginLeft: 30 }}>
          <iframe
            title='chat'
            src='https://vimeo.com/live-chat/431197906/eb6ef3c973'
            width='400'
            height='600'
            frameBorder='0'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
