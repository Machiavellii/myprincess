import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentProfileAdmin } from "../../actions/adminControl";
import Spinner from "../layout/Spinner";

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
} from "../../constants/data.json";

import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";

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
} from "../common/consts";

const EditAdmin = ({
  getCurrentProfileAdmin,
  profile: { profile, loading }
}) => {
  const idd = useParams();
  const { id } = idd;
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
    type: "",
    errors: ""
  });

  // const [cover_photo, setCoverphoto] = useState(null);
  // const [photos, setGalleryphoto] = useState('');

  useEffect(() => {
    getCurrentProfileAdmin(id);
  }, [getCurrentProfileAdmin]);

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
    type,
    is_active,
    errors
  } = formData;

  const onChange = e => {
    // if (e.target.name === 'cover_photo') {
    //   setCoverphoto(e.target.files[0]);
    // }
    // if (e.target.name === 'photos') {
    //   setGalleryphoto(e.target.files);
    // }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCheckStatus = (value, type) => {
    let list = null;

    if (type === "languages") {
      list = profile.languages;
    }

    if (type === "services") {
      list = profile.services;
    }

    if (value === profile.is_active) {
      return true;
    }

    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          return true;
        }
      }
    }
  };

  const onCheckBox = (e, item) => {
    if (e.target.checked) {
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

    // let formCover = new FormData();
    // formCover.append('cover_photo', cover_photo);

    // let formGallery = new FormData();

    // for (const key of Object.keys(photos)) {
    //   formGallery.append('photos', photos[key]);
    // }

    // uploadGallery(formGallery);
    // uploadCover(formCover);

    // createProfile(formData, history, true);
  };

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="text-center">Post an ad - 7 days</h1>
          <form
            className="container mb-5 edit-form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
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
                  checked={getCheckStatus(true)}
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
                  checked={getCheckStatus(false)}
                />
                <label className="form-check-label" htmlFor="inactive">
                  inactive
                </label>
              </div>
            </div>

            {/* <InputGroup placeholder={'Nickname'} labels={nickname} required /> */}

            <SelectListGroup
              name="type"
              value={profile.type}
              onChange={onChange}
              error={errors}
              options={typeList}
              labels={typeLabel}
            />

            <div className="form-group">
              <label htmlFor=" Spoken languages" className="form-check-label">
                Spoken languages
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
                      id="item"
                      value={item}
                      name="languages"
                      onChange={e => onCheckBox(e, item)}
                      checked={getCheckStatus(item, "languages")}
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
              value={profile.slogan}
              error={errors}
            />

            <SelectListGroup
              name="gender"
              value={profile.gender}
              onChange={onChange}
              error={errors}
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
                      onChange={e => onCheckBoxServ(e, service)}
                      checked={getCheckStatus(service, "services")}
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
              value={profile.category}
              onChange={onChange}
              error={errors}
              options={categoryList}
              labels={categoryLabel}
            />
            <SelectListGroup
              name="sexual_orientation"
              value={profile.sexual_orientation}
              onChange={onChange}
              error={errors}
              options={sexual_orientationList}
              labels={sexualOrientationLabel}
            />
            <InputGroup
              name="age"
              placeholder={"18"}
              onChange={onChange}
              labels={ageLabel}
              value={profile.age}
              error={errors}
            />
            <SelectListGroup
              name="silhouette"
              value={profile.silhouette}
              onChange={onChange}
              error={errors}
              options={silhouetteList}
              labels={silhouetteLabel}
            />
            <SelectListGroup
              name="origin"
              value={profile.origin}
              onChange={onChange}
              error={errors}
              options={originList}
              labels={originLabel}
            />

            <TextAreaGroup
              placeholder="Short Bio "
              name="description"
              value={profile.description}
              onChange={onChange}
              // error={error}
              info="Tell us a little about yourself"
              labels={descriptionLabel}
            />

            <SelectListGroup
              name="canton"
              value={profile.canton}
              onChange={onChange}
              error={errors}
              options={cantonsList}
              labels={cantonLabel}
            />
            <SelectListGroup
              name="city"
              value={profile.city}
              onChange={onChange}
              error={errors}
              options={cityList}
              labels={cityLabel}
            />
            <InputGroup
              name="zip"
              placeholder={"8000"}
              onChange={onChange}
              labels={cityzipLabel}
              value={profile.zip}
              error={errors}
            />

            {/* <InputGroup
            type="file"
            name="cover_photo"
            onChange={onChange}
            labels={coverLabel}
          />
          <div className="holder-img">
            {cover_photo === null ? (
              ''
            ) : (
              <div>
                <img src={profile.cover_photo} alt="" />
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
            {photos.length < 1 || undefined
              ? ''
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
                You need upload new gallery before finish editing profile!
              </small>
            </p> */}

            <TextAreaGroup
              placeholder="21:00 - 05:00"
              name="hours"
              value={profile.hours}
              onChange={onChange}
              // error={error}
              labels={businesshoursLabel}
            />

            <TextAreaGroup
              placeholder="200CHF"
              name="rate"
              value={profile.rate}
              onChange={onChange}
              // error={error}
              labels={rateLabel}
            />
            <InputGroup
              name="phone"
              placeholder={"+41 79 000 00 00"}
              onChange={onChange}
              labels={phonenumberLabel}
              value={profile.phone}
              error={errors}
            />
            <InputGroup
              name="website"
              placeholder={"https://www.site.com"}
              onChange={onChange}
              labels={websiteLabel}
              value={profile.website}
              error={errors}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block main-theme-btn"
            >
              Edit Profile
            </button>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfileAdmin })(
  withRouter(EditAdmin)
);
