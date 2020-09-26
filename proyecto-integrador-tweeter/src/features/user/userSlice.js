import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    signingUp: false,
    signupError: null,
    loggedIn: false,
    logInProgress: false,
    loginError: null,
  },
  reducers: {
    loginStart(state, action) {
      state.logInProgress = true;
    },
    loginSuccess(state, action) {
      state.loggedIn = true;
      state.logInProgress = false;
    },
    loginError(state, action) {
      state.loggedIn = false;
      state.logInProgress = false;
      state.loginError = action.payload;
    },

    signupUserStart(state, action) {
      state.signingUp = true;
    },
    signupUserSuccess(state, action) {
      state.signingUp = false;
      state.loggedIn = true;
      state.signupError = null;
    },
    signupUserError(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = action.payload;
    },
    logOut(state, action) {
      state.signingUp = false;
      state.signupError = null;
      state.loggedIn = false;
    },
  },
});

export const {
  signupUserError,
  signupUserStart,
  signupUserSuccess,
  logOut,
  loginStart,
  loginError,
  loginSuccess,
} = userSlice.actions;

export const logOutUser = (history) => {
  return function (dispatch) {
    dispatch(logOut());
    localStorage.removeItem("token");
    history.push("/login");
  };
};

export const loginUser = (user, history) => {
  return async function (dispatch) {
    dispatch(loginStart());

    try {
      const response = await api.post("/sessions", user);

      dispatch(loginSuccess());

      localStorage.setItem("token", response.data.token);

      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      history.push("/tweets");
    } catch (error) {
      dispatch(loginError(error.response?.data.message));
    }
  };
};

export const signupUser = (user, history) => {
  return async function (dispatch) {
    dispatch(signupUserStart());

    try {
      const response = await api.post("/users", user);

      dispatch(signupUserSuccess());

      // guardar en localStorage
      localStorage.setItem("token", response.data.token);

      // actulizar instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // redireccionar a tweets
      history.push("/tweets");
    } catch (error) {
      dispatch(signupUserError(error.response?.data));
    }
  };
};

export default userSlice.reducer;
