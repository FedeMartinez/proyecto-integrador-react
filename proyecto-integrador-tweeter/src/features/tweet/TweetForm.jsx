import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendTweet } from "./tweetSlice";
import CustomPreloader from "./Preloader";

function TweetForm({ history }) {
  const [text, setText] = useState("");
  const sendingTweet = useSelector((state) => state.tweet.sendingTweet);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTweet(text, history));
  };
  return sendingTweet ? (
    <CustomPreloader text="Enviando Tweet" />
  ) : (
    <form onSubmit={handleSubmit}>
      <h1>New Tweet</h1>
      <textarea
        placeholder="Say something"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}

export default TweetForm;
