import axios from "axios";
import { setAlert } from "./alert";

import { GET_OPINIONS, OPINION_ERROR, ADD_OPINIONS } from "./type";

export const getOpinions = () => async dispatch => {
  try {
    const res = await axios.get("/api/opinion");

    dispatch({
      type: GET_OPINIONS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: OPINION_ERROR,
      payload: { msg: err.response.statuText, status: err.response.status }
    });
  }
};

// Create Opinion
export const addOpinion = (formData, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/opinion/${id}`, formData, config);

    dispatch({
      type: ADD_OPINIONS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: OPINION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
