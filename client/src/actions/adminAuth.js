import axios from "axios";
import { setAlert } from "./alert";
import {
  ADMIN_LOADED,
  AUTH_ADMIN_ERROR,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./type";

import setAdminToken from "../utills/setAdminToken";

// LOGIN ADMIN
export const loginAdmin = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post("/api/auth/admin", body, config);

    dispatch({
      type: LOGIN_ADMIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_ADMIN_FAIL
    });
  }
};

// LOAD ADMIN
export const loadAdmin = () => async dispatch => {
  if (localStorage.tokenAdmin) {
    setAdminToken(localStorage.tokenAdmin);
  }

  try {
    const res = await axios.get("/api/auth/admin");

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ADMIN_ERROR
    });
  }
};

// LOG OUT ADMIN
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
