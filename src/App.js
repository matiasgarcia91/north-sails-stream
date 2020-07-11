import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import StreamPage from "./pages/StreamPage";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import DisconnectPage from "./pages/DisconnectedPage";
import {
  saveSocketId,
  abortConnection,
  getStreamCode,
  endStream,
} from "./store/user/actions";
import "./App.css";
import login from "./login.jpg";
import { HEROKU_URL } from "./constants";
import LiveChat from "react-livechat";

import socketIOClient from "socket.io-client";

function App() {
  const dispatch = useDispatch();
  console.log(login);
  useEffect(() => {
    const socket = socketIOClient(HEROKU_URL);
    dispatch(getStreamCode());
    console.log(socket);
    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });

    socket.on("kick-out", data => {
      dispatch(abortConnection());
      console.log(data);
    });

    socket.on("end-stream", data => {
      console.log("end stream");
      dispatch(endStream());
      console.log(data);
    });
  }, [dispatch]);
  return (
    <div className='App' id='app'>
      <Switch>
        <Route
          path='/.well-known/pki-validation/FC61FEA307B4D860FA7DEB6D0455C584.txt'
          onEnter={() => window.location.reload()}
        />
        <Route path='/stream' component={StreamPage} />
        <Route path='/disconnected' component={DisconnectPage} />
        <Route path='/admin/edit' component={AdminPage} />
        <Route path='/admin' component={AdminLogin} />
        <Route path='/' component={LoginPage} />
      </Switch>
      <LiveChat license={12058494} />
    </div>
  );
}

export default App;
