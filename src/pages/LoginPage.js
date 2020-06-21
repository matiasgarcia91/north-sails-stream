import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { login } from "../store/user/actions";
import { getError } from "../store/user/selectors";
import "./login.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255,246,240,0.8)",
    padding: "50px 30px 30px 30px",
    marginBottom: 100,
  },
  button: {
    color: "rgba(255,246,240,1)",
    backgroundColor: "#8f8f8f",
    "&:hover": {
      backgroundColor: "#7a7a7a",
    },
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(getError);

  const classes = useStyles();

  console.log(classes.button.root);

  const submitLogin = e => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login(email, password, history));
    console.log(email, password);
  };

  return (
    <div className='login'>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 300,
        }}
        onSubmit={submitLogin}
      >
        <div className='form-fields'>
          <TextField
            error={!!error}
            variant='filled'
            name='email'
            label='Email'
            type='email'
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-fields'>
          <TextField
            error={!!error}
            variant='filled'
            name='password'
            label='Password'
            type='password'
            fullWidth
            helperText={error}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='form-button'>
          <Button
            variant='contained'
            classes={{ contained: classes.button }}
            type='submit'
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
