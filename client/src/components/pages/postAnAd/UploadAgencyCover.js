import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  uploadAgencyCover,
  getCurrentAgency,
} from "../../../actions/agencyProfile";

import Progress from "../../layout/Progress";

const UploadAgencyCover = ({
  uploadAgencyCover,
  history,
  getCurrentAgency,
  agency: { agency, loading },
}) => {
  const [cover_photo, setCoverphoto] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    getCurrentAgency();

    setCoverphoto({
      cover_photo: loading || !agency.cover_photo ? null : agency.cover_photo,
    });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentAgency]);

  const onChange = (e) => {
    setCoverphoto(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formCover = new FormData();
    formCover.append("cover_photo", cover_photo);

    uploadAgencyCover(formCover, history, setUploadPercentage);
  };

  return (
    <div className="container upload-cover">
      <Link to="/dashboard" className="btn btn-light mt-3">
        Back
      </Link>
      <form onSubmit={onSubmit} className="p-5">
        <h4 className="mb-3 text-center">Upload Profile Photo</h4>
        <input
          type="file"
          name="cover_photo"
          onChange={onChange}
          className="form-control mb-3"
        />

        <Progress percentage={uploadPercentage} />

        {agency === null || agency.cover_photo === undefined ? (
          <p className="text-center">
            <small className="tip">Add new cover photo</small>
          </p>
        ) : (
          <div className="holder-img">
            <div className="closeHolder">
              {/* <button
                type="button"
                className="close"
                // onClick={e => onClickImg(agency.cover_photo)}
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
              <img src={agency.cover_photo} alt="" />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block main-theme-btn mb-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  agency: state.agencyProfile,
});

export default connect(mapStateToProps, {
  uploadAgencyCover,
  getCurrentAgency,
})(withRouter(UploadAgencyCover));
