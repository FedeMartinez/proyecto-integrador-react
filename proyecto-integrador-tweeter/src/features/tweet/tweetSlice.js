import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    sendingTweet: false,
    sendTweetError: null,
    fetchingTweets: true,
    fetchTweetsError: null,
  },
  reducers: {
    fetchingTweetsInProgress(state, action) {
      state.fetchingTweets = true;
    },
    sendTweetStart(state, action) {
      state.sendingTweet = true;
    },
    sendTweetSuccess(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = null;
      state.tweets.push(action.payload);
    },
    sendTweetError(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = action.payload;
    },
    fetchTweetsError(state, action) {
      state.fetchingTweets = false;
      state.fetchTweetsError = action.payload;
    },
    fetchTweetsSuccess(state, action) {
      state.tweets = action.payload;
      state.fetchingTweets = false;
    },
  },
});

export const {
  sendTweetError,
  fetchTweetsError,
  sendTweetStart,
  sendTweetSuccess,
  fetchTweetsSuccess,
  fetchingTweetsInProgress,
} = tweetSlice.actions;

export const sendTweet = (text, history) => async (dispatch) => {
  dispatch(sendTweetStart());

  try {
    const response = await api.post("/tweets", { text });
    dispatch(sendTweetSuccess(response.data));
    history.push("/tweets");
  } catch (error) {
    dispatch(sendTweetError(error.response?.data));
  }
};

export const fetchTweets = () => async (dispatch) => {
  dispatch(fetchingTweetsInProgress(dispatch));
  try {
    const response = await api.get("/tweets");
    dispatch(fetchTweetsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTweetsError(error.response?.data));
  }
};

export default tweetSlice.reducer;
