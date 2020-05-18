import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  agencyToggleActive,
  getCurrentAgency,
  boostAgencyProfile
} from '../../actions/agencyProfile';
import Moment from 'react-moment';

const DashboardActions = ({
  agencyToggleActive,
  boostAgencyProfile,
  agency: { agency }
}) => {
  useEffect(() => {
    getCurrentAgency();
  }, []);

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let remainingHours = new Date();
  const dateOfExpiry = remainingHours.addDays(agency.subscription_plan);

  let diffTime = Math.abs(dateOfExpiry - Date.now());

  const hoursUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) * 24;

  const renderIsActiveButton = () => {
    return !agency.is_active ? (
      <button
        type="button"
        className="btn btn-success"
        onClick={() => agencyToggleActive()}
      >
        Active Hours
      </button>
    ) : (
      <Fragment>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => agencyToggleActive()}
        >
          Deactivate Hours
        </button>
      </Fragment>
    );
  };

  return (
    <div>
      <Link
        to={`${
          agency.subscription_plan === undefined
            ? '/agencyadform'
            : '/agency-edit-profile'
        }`}
        className="btn btn-light"
      >
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
      <Link to="/agency-upload-cover" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Profile Photo
      </Link>
      <Link to="/agency-upload-gallery" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Gallery
      </Link>
      <br />
      {agency.subscription_plan > 2 ? (
        <p className="font-weight-bold">
          Your subscription is active until{' '}
          <Moment format="DD/MM/YYYY">{dateOfExpiry}</Moment>
        </p>
      ) : (
        <p className="font-weight-bold">
          Your subscription will expire in {''}
          <span className="bg-danger text-white p-1">
            {hoursUntilExpiry}
          </span>{' '}
          hours
        </p>
      )}

      {renderIsActiveButton()}

      <button
        type="button"
        className="btn btn-warning ml-2"
        onClick={() => boostAgencyProfile()}
      >
        Boost me
      </button>

      {agency.subscription_plan < 2 ? (
        <Link to="/pricingplan" className="btn btn-warning ml-2">
          Buy more hours
        </Link>
      ) : null}
    </div>
  );
};

DashboardActions.propTypes = {
  agencyToggleActive: PropTypes.func.isRequired,
  getCurrentAgency: PropTypes.func.isRequired,
  boostAgencyProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  agency: state.agencyProfile
});

export default connect(mapStateToProps, {
  agencyToggleActive,
  boostAgencyProfile,
  getCurrentAgency
})(DashboardActions);
