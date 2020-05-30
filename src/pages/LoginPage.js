import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = e => {
    e.preventDefault();
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
