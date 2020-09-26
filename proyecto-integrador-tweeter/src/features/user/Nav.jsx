import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { logOutUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const NavLink = ({ to, text }) => (
  <Link to={to} underlayColor="red">
    <b>{text}</b>
  </Link>
);

export default withRouter(function Nav({ history }) {
  const dispatch = useDispatch();
  const userIsLogged = localStorage.getItem("token") != null;
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutUser(history));
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
      {!userIsLogged ? (
        <Fragment>
          <NavLink to="/login" text="Login" />
          <NavLink to="/tweets" text="Tweets" />
          <NavLink to="/signup" text="Signup" />
        </Fragment>
      ) : (
        <Fragment>
          <NavLink to="/tweets" text="Tweets" />
          <NavLink to="/new-tweet" text="New Tweet" />
          <Link onClick={handleLogout}>
            <b>Logout</b>
          </Link>
        </Fragment>
      )}
    </div>
  );
});
