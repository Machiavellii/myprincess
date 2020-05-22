import axios from "axios";
import { setAlert } from "./alert";

import {
  AGENCY_ERROR,
  GET_AGENCY_PROFILE,
  UPLOAD_AGENCY_COVER,
  UPLOAD_AGENCY_GALLERY,
  AGENCY_TOGGLE_ACTIVE,
  CLEAR_AGENCY,
  ACCOUNT_DELETED,
  GET_AGENCY_PROFILES,
} from "./type";

import { toast } from "react-toastify";
import { createBrowserHistory } from "history";

import "react-toastify/dist/ReactToastify.css";

// CREATE AGENCY PROFIL
export const createAgencyProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/agency", formData, config);

    dispatch({
      type: GET_AGENCY_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/agencydashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Current User
export const getCurrentAgency = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/agency/myAgency");

    dispatch({
      type: GET_AGENCY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET All Agency Profiles
export const getAgencyProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_AGENCY });
  try {
    const res = await axios.get("/api/agency");

    dispatch({
      type: GET_AGENCY_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAgencyProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/agency/user/${userId}`);

    dispatch({
      type: GET_AGENCY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// UPLOAD COVER
export const uploadAgencyCover = (
  formFile,
  history,
  setUploadPercentage
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        //Clear Progress bar
        setTimeout(() => setUploadPercentage(0), 4000);
      },
    };

    const res = await axios.post("api/agency/upload-cover", formFile, config);

    dispatch({
      type: UPLOAD_AGENCY_COVER,
      payload: res.data,
    });

    dispatch(setAlert("Profile Photo Added", "success"));

    setTimeout(() => history.push("/agencydashboard"), 5000);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const uploadAgencyGallery = (
  formFile,
  history,
  setUploadPercentage
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        //Clear Progress bar
        setTimeout(() => setUploadPercentage(0), 4000);
      },
    };

    const res = await axios.post("api/agency/upload-gallery", formFile, config);

    dispatch({
      type: UPLOAD_AGENCY_GALLERY,
      payload: res.data,
    });

    setTimeout(() => history.push("/agencydashboard"), 5000);
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log(err);
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }
  }
};

//Toggle Active hours
export const agencyToggleActive = () => async (dispatch) => {
  try {
    const res = await axios.put("/api/agency/me/isActive");

    dispatch({
      type: AGENCY_TOGGLE_ACTIVE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const agencyDeleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      await axios.delete("/api/agency");

      dispatch({ type: CLEAR_AGENCY });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted", "danger"));
    } catch (err) {
      dispatch({
        type: AGENCY_ERROR,
        payload: { msg: err.reponse.statusText, status: err.reponse.status },
      });
    }
  }
};

export const typePlanAgency = (value) => async (dispatch) => {
  try {
    const res = await axios.post("api/agency/type", value);

    console.log(res);

    dispatch({
      type: GET_AGENCY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// SUBSCRIPTION PLAN
export const subscribePlan = (time) => async (dispatch) => {
  try {
    const res = await axios.post("api/agency/subscription", time);

    dispatch({
      type: GET_AGENCY_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
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
          history.push(`/agencyadform`),
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

//Boost profile
export const boostAgencyProfile = () => async (dispatch) => {
  try {
    await axios.put("/api/agency/boost");

    dispatch(setAlert("Your Profile has been boosted", "success"));
  } catch (err) {
    dispatch({
      type: AGENCY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
