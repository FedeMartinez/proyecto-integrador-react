import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTweets } from "./tweetSlice";
import CustomPreloader from "./Preloader";
import Tweet from "./Tweet";

function Tweets() {
  const tweets = useSelector((state) => state.tweet.tweets);
  const fetchingTweets = useSelector((state) => state.tweet.fetchingTweets);
  const fetchTweetsError = useSelector((state) => state.tweet.fetchTweetsError);
  const dispatch = useDispatch();

  const solveView = () => {
    return fetchTweetsError != null ? (
      <div>
        <h1 style={{ color: "red" }}>
          There was an error loading tweets: {fetchTweetsError}
        </h1>
      </div>
    ) : (
      <div>
        <dl>
          {tweets.map((tweet) => (
            <Tweet tweet={tweet} />
          ))}
        </dl>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return fetchingTweets ? (
    <CustomPreloader text="Loading tweets" />
  ) : (
    solveView()
  );
}

export default Tweets;
