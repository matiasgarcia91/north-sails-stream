import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import StreamPage from "./pages/StreamPage";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import DisconnectPage from "./pages/DisconnectedPage";
import { saveSocketId, abortConnection } from "./store/user/actions";
import "./App.css";
import login from "./login.jpg";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();
  console.log(login);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });

    socket.on("Hey fuckface!", data => {
      dispatch(abortConnection());
      console.log(data);
    });
  }, [dispatch]);
  return (
    <div className='App'>
      <Switch>
        <Route path='/stream' component={StreamPage} />
        <Route path='/disconnected' component={DisconnectPage} />
        <Route path='/admin/edit' component={AdminPage} />
        <Route path='/admin' component={AdminLogin} />
        <Route path='/' component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
