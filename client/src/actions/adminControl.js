import axios from "axios";
import { setAlert } from "./alert";
import { CLEAR_PROFILE, PROFILE_ERROR, ACCOUNT_DELETED_ADMIN } from "./type";

// Delete account & profile
export const deleteAccountAdmin = id => async dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      await axios.delete(`/api/admin/${id}`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED_ADMIN, payload: id });

      dispatch(setAlert("Your account has been permanantly deleted", "danger"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.reponse.statusText, status: err.reponse.status }
      });
    }
  }
};
