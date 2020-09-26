import React, { Fragment } from "react";

export default function Tweet({ tweet }) {
  return (
    <Fragment key={tweet.id}>
      <dt>
        <strong>@{tweet.author.username}</strong>
      </dt>
      <dd>{tweet.text}</dd>
      <hr />
    </Fragment>
  );
}
