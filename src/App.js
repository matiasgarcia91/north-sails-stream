import React, { useEffect } from "react";
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
import { HEROKU_URL } from "./constants";

import socketIOClient from "socket.io-client";

function App() {
  const dispatch = useDispatch();
  console.log(login);
  useEffect(() => {
    const socket = socketIOClient(HEROKU_URL);
    console.log(socket);
    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });

    socket.on("kick-out", data => {
      console.log("other connection");
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
