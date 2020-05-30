import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/user/actions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitLogin = e => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login(email, password));
    console.log(email, password);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitLogin}
      >
        <div>
          <label>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
