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

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  let remainingHours = new Date();
  const dateOfExpiry = remainingHours.addDays(profile.subscription_plan);

  let diffTime = Math.abs(dateOfExpiry - Date.now());

  const hoursUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) * 24;

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
      {profile.subscription_plan > 2 ? (
        <p className="font-weight-bold">
          Your subscription is active until{" "}
          <Moment format="DD/MM/YYYY">{dateOfExpiry}</Moment>
        </p>
      ) : (
        <p className="font-weight-bold">
          Your subscription will expire in {""}
          <span className="bg-danger text-white p-1">
            {hoursUntilExpiry}
          </span>{" "}
          hours
        </p>
      )}

      {renderIsActiveButton()}

      {profile.subscription_plan < 2 ? (
        <Link to="/pricingplan" className="btn btn-warning ml-2">
          Buy more hours
        </Link>
      ) : null}
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
