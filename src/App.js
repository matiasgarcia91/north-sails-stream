import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import StreamPage from "./pages/StreamPage";
import LoginPage from "./pages/LoginPage";
import { saveSocketId } from "./store/user/actions";
import "./App.css";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });
    socket.on("FromAPI", data => {
      setResponse(data);
      // console.log(data);
    });
  }, [dispatch]);
  return (
    <div className='App'>
      <header className='App-header'>
        <Switch>
          <Route exact path='/' component={StreamPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
