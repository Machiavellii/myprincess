import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { uploadGallery, getCurrentProfile } from "../../../actions/profile";

const UploadGallery = ({
  uploadGallery,
  history,
  profile: { profile, loading }
}) => {
  const [photos, setGalleryphoto] = useState("");

  useEffect(() => {
    getCurrentProfile();

    setGalleryphoto({
      photos: loading || !profile.photos ? null : profile.photos
    });
  }, [loading, getCurrentProfile]);

  const onChange = e => {
    setGalleryphoto(e.target.files);
  };

  const onSubmit = e => {
    e.preventDefault();

    let formGallery = new FormData();

    for (const key of Object.keys(photos)) {
      formGallery.append("photos", photos[key]);
    }

    uploadGallery(formGallery, history, true);
  };

  const onClickImg = photo => {
    const imgs = profile.photos.map(img =>
      img === photo ? profile.photos.splice(photo, 1) : photos
    );
    setGalleryphoto(imgs);

    // console.log(profile.photos);
  };

  return (
    <div className="container">
      <h4>Upload Gallery</h4>
      <form onSubmit={onSubmit} className="p-5">
        <input
          type="file"
          name="photos"
          onChange={onChange}
          multiple
          className="mb-1"
        />
        <div className="holder-gallery">
          {profile.photos === undefined
            ? ""
            : profile.photos.map((photo, i) => (
                <div key={i}>
                  <button
                    type="button"
                    className="close"
                    onClick={e => onClickImg(photo)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <img src={photo} alt="" />
                </div>
              ))}
        </div>

        <p className="text-center">
          <small className="tip">
            You need delete all gallery before upload new!
          </small>
        </p>
        <button
          type="submit"
          className="btn btn-primary  btn-block main-theme-btn mb-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { uploadGallery, getCurrentProfile })(
  withRouter(UploadGallery)
);
