import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/adminAuth";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
// import Modal from "./deleteAdmin";

const Admin = ({ logout, getProfiles, profile }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const { profiles } = profile;
  return (
    <Fragment>
      {profile.profiles.length < 1 ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Search by names"
            />
          </div>
          {profiles.map(profile => (
            <div className="card mb-3" key={profile._id}>
              <div className="card-header">
                <div className="expire-holder">
                  <span className="mb-2">
                    This profile is{" "}
                    {profile.is_active ? (
                      <span className="badge badge-success">active</span>
                    ) : (
                      <span className="badge badge-danger">is not active</span>
                    )}{" "}
                  </span>
                  <br />
                  <span>
                    This profile will be online until
                    <i className="far fa-clock ml-1" />
                    <span className=" ml-1">25/11/2019</span>
                  </span>
                </div>
                <div className="btn-holder">
                  <Link to="!#" className="btn btn-danger">
                    <i className="fas fa-user-minus" /> Delete Profile
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={profile.cover_photo}
                    alt=""
                    style={{ height: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{profile.user.nickname}</h5>
                    <p className="card-text">City: {profile.city}</p>
                    <p className="card-text">Canton: {profile.canton}</p>
                    <p className="card-text">Gender: {profile.gender}</p>
                    <p className="card-text">Email: {profile.user.email} </p>
                    <p className="card-text">
                      <span className="badge badge-info">{profile.type}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="">
            <button className="btn btn-danger mb-2" onClick={logout}>
              Admin Logout
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { logout, getProfiles })(Admin);
