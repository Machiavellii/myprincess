import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardAction from "./DashboardActions";

import Carousel from "../landing/landingpages/landingcontent/singleGirl/carousel/Carousel";
import Header from "../landing/landingpages/landingcontent/singleGirl/describeGirl/componentGirls/HeaderGirl";
import DescribeGirl from "../landing/landingpages/landingcontent/singleGirl/describeGirl/Girl";
import GalleryHolder from "../landing/landingpages/landingcontent/singleGirl/gallery/GalleryHolder";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
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
      {profile !== null ? (
        <Fragment>
          <div className="container text-center px-1">
            {/* <div>
          <i className="fas fa-user" /> Welcome {user && user.nickname}
        </div> */}
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
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"> Delete My Account</i>
              </button>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="container m-5 dashboard-create">
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/postanad" className="btn btn-primary my-3">
              Create Profile
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
