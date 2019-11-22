import React from "react";
import "../../../styles/myprofiles.css";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";
// import { getProfileById } from '../../../actions/profile';

const MyProfiles = ({ profile: { profile, loading } }) => {
  return (
    // <div>
    //   {profile === null || loading ? (
    //     <Spinner />
    //   ) : (

    //   )}
    // </div>
    <div className="container my-profiles">
      <h3 className="heading my-3">My Profiles</h3>
      <button type="button" className="btn btn-primary btn-sm btn-filter mr-2">
        <i className="fas fa-filter mr-2" />
        Filter Profiles
      </button>
      <button type="button" className="btn btn-secondary btn-profile btn-sm">
        <i className="fas fa-user-plus mr-2" />
        Create Another Profile
      </button>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Search by names"
          aria-label="Search by names"
          aria-describedby="basic-addon2"
        />
      </div>

      <div className="card mb-5 pb-2">
        <div className="card-body">
          <div className="card">
            <div className="card-body profile-status">
              <span className="mb-2">
                Your profile is
                <span className="expiry-date"> online </span>
              </span>
              <br />
              <span>
                Your profile will be online until
                <i className="far fa-clock ml-1" />
                <span className="expiry-date ml-1">25/11/2019</span>
              </span>
            </div>
          </div>
        </div>

        <div className="row ml-2 border-between">
          <div className="col-md-6 col-sm-12">
            <div className="row" align="center">
              <div className="col-md-6 ">
                <img src="" alt="profile cover" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h5 className="girl-name">Sara</h5>
                <h6 className="position-text">
                  <span>13/26</span> <br />
                  position in the gallery
                </h6>
                <button
                  type="button"
                  className="btn btn-primary btn-sm btn-boost"
                >
                  <i className="fas fa-arrow-circle-up mr-1" />
                  Boost Now
                  <i className="fas fa-arrow-circle-up ml-1" />
                </button>{" "}
                <br />
                <span className="free-boost">Free Boost</span>
              </div>
            </div>
          </div>

          <div className="col-md-6" align="center">
            <h5 className="manage-profile">Manage my Profile</h5>
            <button type="button" className="btn btn-outline mr-1">
              <i className="fas fa-chart-line mr-1" />
              See Stats
            </button>
            <button type="button" className="btn btn-outline ml-1">
              <i className="far fa-edit" />
              Edit
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mt-2 btn-myprofile"
            >
              <i className="fas fa-rocket mr-1" />
              Gang up more clients!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(MyProfiles);
