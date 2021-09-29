import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const userLoading = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};

//check the token and load user
export const loadUser = () => (dispatch, getState) => {
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Login User
export const login = (username, password) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//Register User
export const register =
  ({ username, password, email }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //Request body
    const body = JSON.stringify({ username, email, password });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

//LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//setup config with Token - helper function
export const tokenConfig = (getState, flg = "json") => {
  //get token from state
  const token = getState().auth.token;
  var contentType = "application/json";
  var rType = "";
  if (flg === "xls") {
    contentType = "application/ms-excel";
    rType = "blob";
  }

  //headers
  const config = {
    headers: {
      "Content-type": contentType,
    },
    responseType: rType,
  };

  // console.log(config);

  //if token , add to headers config
  if (token) {
    config.headers["authorization"] = `Token ${token}`;
  }

  return config;
};
