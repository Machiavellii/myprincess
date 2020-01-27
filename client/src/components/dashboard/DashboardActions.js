import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleActive, getCurrentProfile } from "../../actions/profile";
import Moment from "react-moment";

const DashboardActions = ({ toggleActive, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const renderIsActiveButton = () => {
    return !profile.is_active ? (
      <button
        type="button"
        className="btn btn-success"
        onClick={() => toggleActive()}
      >
        Active Hours
      </button>
    ) : (
      <Fragment>
        <small className="d-block mb-1">
          Your profile is active until{" "}
          <Moment format="DD/MM/YYYY" add={{ days: profile.subscription_plan }}>
            {profile.date}
          </Moment>
        </small>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => toggleActive()}
        >
          Deactivate Hours
        </button>
      </Fragment>
    );
  };

  return (
    <div>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
      <Link to="/upload-cover" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Profile Photo
      </Link>
      <Link to="/upload-gallery" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Gallery
      </Link>
      <br />

      {renderIsActiveButton()}
    </div>
  );
};

DashboardActions.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { toggleActive, getCurrentProfile })(
  DashboardActions
);
