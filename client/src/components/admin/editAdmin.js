import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editProfile } from "../../actions/adminControl";
import Spinner from "../layout/Spinner";

import {
  spokenLanguageList,
  categoryList,
  servicesList,
  silhouetteList,
  originList,
  genderList,
  sexual_orientationList,
  typeList
} from "../../constants/data.json";

import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";

import {
  typeLabel,
  sloganLabel,
  genderLabel,
  categoryLabel,
  sexualOrientationLabel,
  ageLabel,
  silhouetteLabel,
  originLabel,
  descriptionLabel,
  addressLabel,
  businesshoursLabel,
  rateLabel,
  phonenumberLabel,
  websiteLabel,
  webcamlinkLabel
  // coverLabel
} from "../common/consts";

const EditAdmin = ({ editProfile, history, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    gender: "",
    sexual_orientation: "",
    phone: "",
    category: "",
    services: [],
    age: "",
    origin: "",
    description: "",
    address: "",

    is_active: "",
    languages: [],
    silhouette: "",
    rate: "",
    slogan: "",
    hours: "",
    website: "",
    webcamlink: "",
    type: ""
  });

  useEffect(() => {
    if (profile !== null) {
      setFormData(profile);
    }
  }, [profile]);

  const {
    gender,
    sexual_orientation,
    phone,
    category,
    services,
    age,
    origin,
    description,
    address,

    languages,
    silhouette,
    rate,
    slogan,
    hours,
    website,
    webcamlink,
    type
    // is_active
  } = formData;

  // setFormData({
  //   gender: !profile ? "" : profile.gender
  // });

  // console.log(profile);

  const onChange = e => {
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

    editProfile(formData, history);
    console.log(formData);
  };

  return (
    <Fragment>
      {profile === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="container">
            <Link to="/superadmin" className="btn btn-light">
              Back
            </Link>
          </div>
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
              value={type}
              onChange={onChange}
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
                      id={item}
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
                      id={service}
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
            <InputGroup
              name="address"
              placeholder="Building 36, Rue de Montchoisy, Eaux-Vives, Geneva, 1027, Switzerland"
              onChange={onChange}
              labels={addressLabel}
              value={address}
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
                <img src={cover_photo} alt="" />
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
              : photos.map((photo, i) => (
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
              name="webcamlink"
              placeholder={"Webcam Link"}
              onChange={onChange}
              labels={webcamlinkLabel}
              value={webcamlink}
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

export default connect(mapStateToProps, {
  editProfile
})(withRouter(EditAdmin));
