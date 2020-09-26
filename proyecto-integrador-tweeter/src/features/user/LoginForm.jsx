import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userSlice";
import CustomPreloader from "../tweet/Preloader";

function LoginForm({ history }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const logInProgress = useSelector((state) => state.user.logInProgress);
  const loginError = useSelector((state) => state.user.loginError);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({ email: user, username: user, password: password }, history)
    );
  };
  return logInProgress ? (
    <CustomPreloader text="Loging in" />
  ) : (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter email or username"
        required
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {loginError != null ? (
        <Fragment>
          <br />
          <b style={{ color: "red" }}>{loginError}</b>
          <br />
        </Fragment>
      ) : null}
      <button type="submit">Submit</button>
      <br />
      <br />
      <Link to="/signup">Don't have an account?</Link>
    </form>
  );
}

export default LoginForm;
