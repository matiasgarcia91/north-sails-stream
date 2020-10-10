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
    backgroundColor: "rgba(255,255,255,1)",
  },
  button: {
    color: "rgba(0,0,0,1)",
    backgroundColor: "rgba(255,255,255,1)",
    "&:hover": {
      backgroundColor: "#c4c4c4",
    },
  },
  textFields: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
    marginBottom: 2,
    marginTop: 2,
  },
  label: {
    color: "white",
  },
  black: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
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
      <div style={{ flex: 0.5 }} />
      <div
        style={{
          flex: 1,
          maxHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 300,
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
              error={!!error}
              variant='filled'
              name='email'
              label='Email'
              type='email'
              fullWidth
              size='small'
              margin='dense'
              value={email}
              classes={{ root: classes.textFields }}
              InputProps={{
                classes: { input: classes.black },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
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
              margin='dense'
              size='small'
              classes={{ root: classes.textFields }}
              InputProps={{
                classes: { input: classes.black },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              fullWidth
              helperText={error}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-button'>
            <Button
              variant='contained'
              classes={{ contained: classes.button, root: classes.root }}
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
