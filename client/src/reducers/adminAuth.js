import {
  ADMIN_LOADED,
  AUTH_ADMIN_ERROR,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAIL,
  LOGOUT
} from "../actions/type";

const initialState = {
  tokenAdmin: localStorage.getItem("tokenAdmin"),
  authenticatedAdmin: null,
  loading: true,
  admin: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        authenticatedAdmin: true,
        loading: false,
        admin: payload
      };
    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem("tokenAdmin", payload.tokenAdmin);
      return {
        ...state,
        ...payload,
        authenticatedAdmin: true,
        loading: false
      };
    case AUTH_ADMIN_ERROR:
    case LOGIN_ADMIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("tokenAdmin");
      return {
        ...state,
        token: null,
        authenticatedAdmin: false,
        loading: false
      };
    default:
      return state;
  }
}
