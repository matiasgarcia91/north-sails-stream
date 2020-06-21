import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../store/user/actions";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitLogin = e => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(adminLogin(email, password, history));
    console.log("admin", email, password);
  };

  return (
    <div>
      <h2>Admin</h2>
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

export default AdminLogin;
