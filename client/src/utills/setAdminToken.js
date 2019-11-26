import axios from "axios";

const setAdminToken = tokenAdmin => {
  if (tokenAdmin) {
    axios.defaults.headers.common["x-auth-token"] = tokenAdmin;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAdminToken;
