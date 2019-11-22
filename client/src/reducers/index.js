import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import adminAuth from "./adminAuth";
import profile from "./profile";

export default combineReducers({
  alert,
  auth,
  profile,
  adminAuth
});
