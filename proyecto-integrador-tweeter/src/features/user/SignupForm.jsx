import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./userSlice";
import CustomPreloader from "../tweet/Preloader";

function SignupForm({ history }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.signupError);
  const signingUp = useSelector((state) => state.user.signingUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, username, password }, history));
  };
  return signingUp ? (
    <CustomPreloader text="Welcome! Signing Up!" />
  ) : (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Enter email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignupForm;
