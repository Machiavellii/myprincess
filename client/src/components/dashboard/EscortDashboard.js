import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardAction from "./DashboardActions";

import Carousel from "../landing/landingpages/landingcontent/singleGirl/carousel/Carousel";
import Header from "../landing/landingpages/landingcontent/singleGirl/describeGirl/componentGirls/HeaderGirl";
import DescribeGirl from "../landing/landingpages/landingcontent/singleGirl/describeGirl/Girl";
import GalleryHolder from "../landing/landingpages/landingcontent/singleGirl/gallery/GalleryHolder";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const EscortDashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container text-center px-1">
        <DashboardAction />
      </div>
      <Carousel photos={profile.photos} />
      <div className="holder dashboard-content">
        <Header profile={profile} />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <DescribeGirl profile={profile} />
            </div>
            <div className="col-sm-12 col-md-4 gallery">
              <GalleryHolder profile={profile} />
            </div>
          </div>
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fas fa-user-minus"> Delete My Account</i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

EscortDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(EscortDashboard);
