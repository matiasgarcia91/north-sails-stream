import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/user/actions";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "./login.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255,246,240,0.8)",
    padding: "50px 30px 30px 30px",
    marginBottom: 200,
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const submitLogin = e => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login(email, password, history));
    console.log(email, password);
  };

  return (
    <div className='login'>
      <Paper
        elevation={3}
        classes={{
          root: classes.root,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onSubmit={submitLogin}
        >
          <div className='form-fields'>
            <TextField
              variant='filled'
              name='email'
              label='Email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-fields'>
            <TextField
              variant='filled'
              name='password'
              label='Password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-button'>
            <Button variant='contained' color='primary' type='submit'>
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
