import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermissionAndName } from "../store/user/selectors";
import "./stream.css";

const StreamPage = () => {
  const { permission, fullName } = useSelector(getStreamPermissionAndName);
  const history = useHistory();

  useEffect(() => {
    if (!permission && !fullName) {
      history.push("/disconnected");
    } else if (!permission) {
      history.push("/disconnected");
    }
  }, [permission, fullName, history]);

  return (
    <div className='stream-page'>
      <div className='center-it'>
        <div className='video-container'>
          <iframe
            title='stream'
            width='853'
            height='480'
            src='https://www.youtube.com/embed/vMk2IMEiwII'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          <div className='bar'>{fullName}</div>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
