import React from "react";
import { Route, Redirect } from "react-router-dom";
import TweetForm from "../features/tweet/TweetForm";

export default function PrivateRoute({ component: Component, ...otherProps }) {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        localStorage.getItem("token") ? (
          <TweetForm {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
