import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILES,
  PROFILE_ERROR,
  GET_PROFILE,
  FILTER_PROFILE,
  SEARCHPAGE_FILTER,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from './type';

//Get Current User
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

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
    const res = await axios.get('/api/profile');

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

    console.log(res.data);

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
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/postanad');
      // window.location.reload();
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: PROFILE_ERROR,
          payload: error.msg
        })
      );
    }

    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// UPLOAD COVER
export const uploadCover = (formFile, formGallery) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('api/profile/upload-cover', formFile, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: UPDATE_PROFILE,
          payload: error.msg
        })
      );
    }
  }
};

export const uploadGallery = formFile => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const res = await axios.post(
      'api/profile/upload-gallery',
      formFile,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: PROFILE_ERROR,
          payload: error.msg
        })
      );
    }
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
      payload: ''
    });
  }
};
export const filterSearchPage = value => dispatch => {
  dispatch({
    type: SEARCHPAGE_FILTER,
    payload: value
  });
};
