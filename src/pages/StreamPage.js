import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStreamPermission } from "../store/user/selectors";
import "./stream.css";

const StreamPage = () => {
  const permission = useSelector(getStreamPermission);
  const history = useHistory();

  useEffect(() => {
    if (!permission) {
      history.push("/disconnected");
    }
  }, [permission, history]);
  return (
    <div className='holder'>
      {/* <iframe
        title='north stream'
        width='724'
        height='568'
        src='https://www.youtube.com/embed/jm-wsyJ6TwA'
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
        class='frame'
      ></iframe> */}
      <div className='bar'>Soy gandalf</div>
    </div>
  );
};

export default StreamPage;
