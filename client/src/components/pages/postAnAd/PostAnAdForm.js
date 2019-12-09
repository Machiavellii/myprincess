import React, { Fragment, useState, useEffect } from "react";
import "../../../styles/PostAnAdForm.css";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createProfile,
  uploadCover,
  uploadGallery
} from "../../../actions/profile";

import {
  spokenLanguageList,
  categoryList,
  servicesList,
  silhouetteList,
  originList,
  cantonsList,
  cityList,
  genderList,
  sexual_orientationList,
  typeList
} from "../../../constants/data.json";

import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import TextAreaGroup from "../../common/TextAreaGroup";
import {
  // nickname,
  typeLabel,
  sloganLabel,
  genderLabel,
  categoryLabel,
  sexualOrientationLabel,
  ageLabel,
  silhouetteLabel,
  originLabel,
  descriptionLabel,
  cantonLabel,
  cityLabel,
  cityzipLabel,
  businesshoursLabel,
  rateLabel,
  phonenumberLabel,
  websiteLabel,
  coverLabel
} from "../../common/consts";

const PostAnAdForm = ({
  createProfile,
  history,
  uploadCover,
  uploadGallery,
  auth: isAuthenticated,
  profile: error
}) => {
  const [formData, setFormData] = useState({
    gender: "",
    sexual_orientation: "",
    phone: "",
    category: "",
    services: [],
    age: "",
    origin: "",
    description: "",
    city: "",
    canton: "",
    zip: "",
    is_active: "",
    languages: [],
    silhouette: "",
    rate: "",
    slogan: "",
    hours: "",
    website: "",
    type: ""
  });

  const [cover_photo, setCoverphoto] = useState(null);
  const [photos, setGalleryphoto] = useState("");

  const {
    gender,
    sexual_orientation,
    phone,
    category,
    services,
    age,
    origin,
    description,
    city,
    canton,
    zip,
    languages,
    silhouette,
    rate,
    slogan,
    hours,
    website,
    type
  } = formData;

  useEffect(() => {
    if (error.error.length > 1) {
      setFormData({ ...formData });
      setTimeout(() => setFormData({ ...formData }), 5000);
    }
  }, [error]);

  const onChange = e => {
    if (e.target.name === "cover_photo") {
      setCoverphoto(e.target.files[0]);
    }
    if (e.target.name === "photos") {
      setGalleryphoto(e.target.files);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckBox = (e, item) => {
    if (languages.indexOf(e.target.value) < 1 && e.target.checked) {
      languages.push(item);
    }

    languages.map((lang, i) => {
      if (!e.target.checked) {
        return e.target.value === lang ? languages.splice(i, 1) : languages;
      }
    });
  };

  const onCheckBoxServ = (e, service) => {
    if (services.indexOf(e.target.value) < 1 && e.target.checked) {
      services.push(service);
    }

    services.map((serv, i) => {
      if (!e.target.checked) {
        return e.target.value === serv ? services.splice(i, 1) : services;
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    let formCover = new FormData();
    formCover.append("cover_photo", cover_photo);

    let formGallery = new FormData();

    for (const key of Object.keys(photos)) {
      formGallery.append("photos", photos[key]);
    }

    uploadGallery(formGallery);
    uploadCover(formCover);
    // console.log(formData)
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="text-center">Post an ad - 7 days</h1>
      <form
        className="container mb-5"
        onSubmit={onSubmit}
        // encType="multipart/form-data"
      >
        {/* {!isAuthenticated.token ? (
          <div className="card mb-4 mt-5">
            <div className="card-body">
              <h5 className="card-title">Already have an account?</h5>
              <hr />
              <p className="card-text">
                <sup>
                  <a href="!#">Login</a>
                </sup>{' '}
                If you do not-have an account, you can create it by below
                Reviews entering your e-mail address / username. The account
                details will be confirmed by email.
              </p>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
            </div>
          </div>
        ) : null} */}

        <div className="form-group">
          <p>Job Activity</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_active"
              id="active"
              value={true}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="active">
              active
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="is_active"
              id="inactive"
              value={false}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="inactive">
              inactive
            </label>
          </div>
          <p className="text-center">
            <small className="tip">
              Please select if your profile is active
            </small>
          </p>
        </div>

        {/* <InputGroup placeholder={'Nickname'} labels={nickname} required /> */}

        <SelectListGroup
          name="type"
          value={type}
          onChange={onChange}
          options={typeList}
          labels={typeLabel}
        />

        <div className="form-group">
          <label htmlFor=" Spoken languages" className="form-check-label">
            Spoken languages *
          </label>
          <br />
          {spokenLanguageList.map((item, index) => {
            return (
              <div
                className="form-check form-check-inline dynamic-checkbox"
                key={index}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item}
                  value={item}
                  onChange={e => onCheckBox(e, item)}
                  name="languages"
                />
                <label
                  className="form-check-label dynamic-checkbox-label ml-2"
                  htmlFor={item}
                >
                  {item}
                </label>
              </div>
            );
          })}
          <p className="text-center mt-4">
            <small className="tip">Please select spoken languages</small>
          </p>
        </div>

        <InputGroup
          name="slogan"
          placeholder={"Slogan"}
          onChange={onChange}
          labels={sloganLabel}
          value={slogan}
        />

        <SelectListGroup
          name="gender"
          value={gender}
          onChange={onChange}
          options={genderList}
          labels={genderLabel}
        />

        <div className="form-group">
          <label htmlFor="Services" className="form-check-label">
            Services *
          </label>
          <br />
          {servicesList.map((service, index) => {
            return (
              <div
                className="form-check form-check-inline dynamic-checkbox"
                key={index}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={service}
                  name="services"
                  id={service}
                  onChange={e => onCheckBoxServ(e, service)}
                />
                <label
                  className="form-check-label dynamic-checkbox-label ml-2"
                  htmlFor={service}
                >
                  {service}
                </label>
              </div>
            );
          })}
        </div>

        <SelectListGroup
          name="category"
          value={category}
          onChange={onChange}
          options={categoryList}
          labels={categoryLabel}
        />
        <SelectListGroup
          name="sexual_orientation"
          value={sexual_orientation}
          onChange={onChange}
          options={sexual_orientationList}
          labels={sexualOrientationLabel}
        />
        <InputGroup
          name="age"
          placeholder={"18"}
          onChange={onChange}
          labels={ageLabel}
          value={age}
        />
        <SelectListGroup
          name="silhouette"
          value={silhouette}
          onChange={onChange}
          options={silhouetteList}
          labels={silhouetteLabel}
        />
        <SelectListGroup
          name="origin"
          value={origin}
          onChange={onChange}
          options={originList}
          labels={originLabel}
        />

        <TextAreaGroup
          placeholder="Short Bio "
          name="description"
          value={description}
          onChange={onChange}
          // error={error}
          info="Tell us a little about yourself"
          labels={descriptionLabel}
        />

        <SelectListGroup
          name="canton"
          value={canton}
          onChange={onChange}
          options={cantonsList}
          labels={cantonLabel}
        />
        <SelectListGroup
          name="city"
          value={city}
          onChange={onChange}
          options={cityList}
          labels={cityLabel}
        />
        <InputGroup
          name="zip"
          placeholder={"8000"}
          onChange={onChange}
          labels={cityzipLabel}
          value={zip}
        />
        <InputGroup
          type="file"
          name="cover_photo"
          onChange={onChange}
          labels={coverLabel}
        />
        <div className="holder-img">
          {cover_photo === null ? (
            ""
          ) : (
            <div>
              <img src={URL.createObjectURL(cover_photo)} alt="" />
            </div>
          )}
        </div>
        <p className="text-center">
          <small className="tip">Add a cover photo</small>
        </p>

        <input
          type="file"
          name="photos"
          onChange={onChange}
          multiple
          className="mb-1"
        />

        <div className="holder-gallery">
          {photos === ""
            ? ""
            : Object.keys(photos).map(photo => (
                <div key={photo}>
                  <img src={URL.createObjectURL(photos[photo])} alt="" />
                </div>
              ))}
        </div>

        <p className="text-center">
          <small className="tip">
            The first picture will be displayed as the hand.
          </small>
        </p>

        <TextAreaGroup
          placeholder="21:00 - 05:00"
          name="hours"
          value={hours}
          onChange={onChange}
          // error={error}
          labels={businesshoursLabel}
        />

        <TextAreaGroup
          placeholder="200CHF"
          name="rate"
          value={rate}
          onChange={onChange}
          // error={error}

          labels={rateLabel}
        />
        <InputGroup
          name="phone"
          placeholder={"+41 79 000 00 00"}
          onChange={onChange}
          labels={phonenumberLabel}
          value={phone}
        />
        <InputGroup
          name="website"
          placeholder={"https://www.site.com"}
          onChange={onChange}
          labels={websiteLabel}
          value={website}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block main-theme-btn"
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile,
  uploadCover,
  uploadGallery
})(withRouter(PostAnAdForm));
