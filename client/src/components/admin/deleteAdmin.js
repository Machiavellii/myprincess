import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const DeleteAdmin = ({ getCurrentProfile, deleteAccount, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log(profile);

  return (
    <div>
      <button type="button" onClick={() => deleteAccount()}>
        Delete
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  DeleteAdmin
);
