import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import AgencyDashboardAction from "./AgencyDashboardAction";

import Carousel from "../landing/landingpages/landingcontent/singleGirl/carousel/Carousel";
import Header from "../landing/landingpages/landingcontent/singleAgency/describeAgency/componentAgency/HeaderAgency";
import DescribeAgency from "../landing/landingpages/landingcontent/singleAgency/gallery/galleryComponent/DescribeAgency";
import GalleryHolderAgency from "../landing/landingpages/landingcontent/singleAgency/gallery/GalleryHolderAgency";

import {
  getCurrentAgency,
  agencyDeleteAccount,
} from "../../actions/agencyProfile";

const AgencyDashboard = ({
  getCurrentAgency,
  agency: { agency, loading },
  agencyDeleteAccount,
}) => {
  useEffect(() => {
    getCurrentAgency();
  }, [getCurrentAgency]);

  return loading && agency === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container text-center px-1">
        <AgencyDashboardAction />
      </div>
      <Carousel photos={agency.photos} />
      <div className="holder dashboard-content">
        <Header agency={agency} />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <DescribeAgency agency={agency} />
            </div>
            <div className="col-sm-12 col-md-4 gallery">
              <GalleryHolderAgency agency={agency} />
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => agencyDeleteAccount()}
          >
            <i className="fas fa-user-minus"> Delete My Account</i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

AgencyDashboard.propTypes = {
  getCurrentAgency: PropTypes.func.isRequired,
  agency: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agency: state.agencyProfile,
});
export default connect(mapStateToProps, {
  getCurrentAgency,
  agencyDeleteAccount,
})(AgencyDashboard);
