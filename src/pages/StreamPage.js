import React from "react";
import "./stream.css";

const StreamPage = () => {
  return (
    <div class='holder'>
      <iframe
        title='north stream'
        width='724'
        height='568'
        src='https://www.youtube.com/embed/jm-wsyJ6TwA'
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
        class='frame'
      ></iframe>
      <div class='bar'>Soy gandalf</div>
    </div>
  );
};

export default StreamPage;
