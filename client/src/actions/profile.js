import axios from "axios";
import { setAlert } from "./alert";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { createBrowserHistory } from "history";

import {
  GET_PROFILES,
  PROFILE_ERROR,
  GET_PROFILE,
  FILTER_PROFILE,
  SEARCHPAGE_FILTER,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  TOGGLE_ACTIVE,
  DECREASE_HOURS,
  UPLOAD_COVER,
  UPLOAD_GALLERY
} from "./type";

toast.configure();

//Get Current User
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// GET All Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// CREATE PROFIL
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");
    // window.location.reload();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// SUBSCRIPTION PLAN
export const subscribePlan = time => async dispatch => {
  try {
    const res = await axios.post("api/profile/subscription", time);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const typePlan = value => async dispatch => {
  try {
    const res = await axios.post("api/profile/type", value);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// UPLOAD COVER

export const uploadCover = (
  formFile,
  history,
  setUploadPercentage
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        //Clear Progress bar
        setTimeout(() => setUploadPercentage(0), 4000);
      }
    };

    const res = await axios.post("api/profile/upload-cover", formFile, config);

    dispatch({
      type: UPLOAD_COVER,
      payload: res.data
    });

    dispatch(setAlert("Profile Photo Added", "success"));

    setTimeout(() => history.push("/upload-gallery"), 5000);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const uploadGallery = (
  formFile,
  history,
  setUploadPercentage
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        //Clear Progress bar
        setTimeout(() => setUploadPercentage(0), 4000);
      }
    };
    const res = await axios.post(
      "api/profile/upload-gallery",
      formFile,
      config
    );

    dispatch({
      type: UPLOAD_GALLERY,
      payload: res.data
    });

    setTimeout(() => history.push("/dashboard"), 5000);
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log(err);
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }
  }
};

export const filterFunc = value => dispatch => {
  const valueV = value.toLowerCase();

  if (value.length >= 3) {
    dispatch({
      type: FILTER_PROFILE,
      payload: valueV
    });
  } else {
    dispatch({
      type: FILTER_PROFILE,
      payload: ""
    });
  }
};
export const filterSearchPage = value => dispatch => {
  dispatch({
    type: SEARCHPAGE_FILTER,
    payload: value
  });
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted", "danger"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.reponse.statusText, status: err.reponse.status }
      });
    }
  }
};

//Toggle Active hours
export const toggleActive = () => async dispatch => {
  try {
    const res = await axios.put("/api/profile/me/isActive");

    dispatch({
      type: TOGGLE_ACTIVE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const decreaseHours = () => async dispatch => {
  try {
    const res = await axios.put("/api/profile/reduceSubscription");
    dispatch({
      type: DECREASE_HOURS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Stripe Payment Method
export const payment = async (profile, token) => {
  const history = createBrowserHistory();
  try {
    const res = await axios.post("/api/payment", { token, profile });

    const { status } = res.data;

    console.log(status);
    status === "success"
      ? toast(
          "Success! Check email for details",
          { type: "success" },
          history.push(`/postanadform`),
          window.location.reload()
        )
      : toast("Something went wrong", { type: "error" });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};
