import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  uploadAgencyGallery,
  getCurrentAgency,
} from "../../../actions/agencyProfile";

import Progress from "../../layout/Progress";

const UploadAgencyGallery = ({
  uploadAgencyGallery,
  getCurrentAgency,
  history,
  agency: { agency, loading },
}) => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [formData, setGalleryphoto] = useState({
    photos: [],
  });
  const [form, setFile] = useState({
    file: [],
  });

  const { photos } = formData;

  useEffect(() => {
    getCurrentAgency();

    setGalleryphoto({
      photos: loading || !agency.photos ? null : agency.photos,
    });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentAgency]);

  const onChange = (e) => {
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      setGalleryphoto({
        ...formData,
        photos: formData.photos.concat(files[i]),
      });
      setFile({
        ...form,
        file: form.file.concat(URL.createObjectURL(files[i])),
      });
    }
  };

  const onClickImg = (photo) => {
    const imgs = agency.photos.filter((img) =>
      img === photo ? agency.photos.splice(photo, 1) : img
    );

    // console.log(imgs);
    setGalleryphoto({ photos: imgs });
  };

  const { file } = form;

  const onSubmit = (e) => {
    e.preventDefault();

    let formGallery = new FormData();

    for (const key of Object.keys(photos)) {
      formGallery.append("photos", photos[key]);
    }
    uploadAgencyGallery(formGallery, history, setUploadPercentage);
  };

  return (
    <div className="container">
      <Link to="/dashboard" className="btn btn-light mt-3">
        Back
      </Link>
      <form onSubmit={onSubmit} className="py-5 w-100">
        <h4 className="mb-3 text-center">Upload Gallery Photos</h4>
        <div className="row justify-content-between">
          <div className="col-6 col-sm-3 col-md-auto">
            <input
              type="file"
              name="photos"
              id="file"
              onChange={onChange}
              className="mb-3 inputfile"
            />
            <label htmlFor="file">
              {file.length === 0 ? (
                <i className="fas fa-plus-circle" />
              ) : (
                <img src={file[0]} alt="" />
              )}
            </label>
          </div>

          <div className="col-6 col-sm-3 col-md-auto">
            <input
              type="file"
              id="file1"
              name="photos"
              onChange={onChange}
              className="mb-3 inputfile"
            />
            <label htmlFor="file1">
              {file.length > 1 ? (
                <img src={file[1]} alt="" />
              ) : (
                <i className="fas fa-plus-circle" />
              )}
            </label>
          </div>

          <div className="col-6 col-sm-3 col-md-auto">
            <input
              type="file"
              id="file2"
              name="photos"
              onChange={onChange}
              className="mb-3 inputfile"
            />
            <label htmlFor="file2">
              {file.length > 2 ? (
                <img src={file[2]} alt="" />
              ) : (
                <i className="fas fa-plus-circle" />
              )}
            </label>
          </div>

          <div className="col-6 col-sm-3 col-md-auto">
            <input
              type="file"
              id="file3"
              name="photos"
              onChange={onChange}
              className="mb-3 inputfile"
            />
            <label htmlFor="file3">
              {file.length > 3 ? (
                <img src={file[3]} alt="" />
              ) : (
                <i className="fas fa-plus-circle" />
              )}
            </label>
          </div>

          <div className="col-6 col-sm-3 col-md-auto">
            <input
              type="file"
              id="file4"
              name="photos"
              onChange={onChange}
              className="mb-3 inputfile"
            />
            <label htmlFor="file4">
              {file.length > 4 ? (
                <img src={file[4]} alt="" />
              ) : (
                <i className="fas fa-plus-circle" />
              )}
            </label>
          </div>
        </div>
        <Progress percentage={uploadPercentage} />

        <div className="row my-3 justify-content-between">
          {agency === null || agency.photos === undefined
            ? ""
            : agency.photos.map((photo, i) => (
                <div
                  className="col-6 col-sm-3 col-md-auto holder-img-btn mb-2"
                  key={i}
                >
                  <button
                    type="button"
                    className="close"
                    onClick={(e) => onClickImg(photo)}
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

const mapStateToProps = (state) => ({
  agency: state.agencyProfile,
});

export default connect(mapStateToProps, {
  uploadAgencyGallery,
  getCurrentAgency,
})(withRouter(UploadAgencyGallery));
