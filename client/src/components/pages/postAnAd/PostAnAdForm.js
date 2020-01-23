import React, { Fragment, useState, useEffect } from "react";
import "../../../styles/PostAnAdForm.css";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../../actions/profile";

import {
  spokenLanguageList,
  categoryList,
  servicesList,
  silhouetteList,
  originList,
  genderList,
  sexual_orientationList,
  typeList
} from "../../../constants/data.json";

import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import TextAreaGroup from "../../common/TextAreaGroup";
import {
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
  websiteLabel
} from "../../common/consts";

// import MapboxAutocomplete from "react-mapbox-autocomplete";

const PostAnAdForm = ({
  createProfile,
  history,

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
    address: "",
    is_active: "",
    languages: [],
    silhouette: "",
    rate: "",
    slogan: "",
    hours: "",
    website: ""
  });

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
    website
  } = formData;

  useEffect(() => {
    if (error.error.length > 1) {
      setFormData({ ...formData });
      setTimeout(() => setFormData({ ...formData }), 5000);
    }
  }, [error]);

  const onChange = e => {
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
    console.log(formData);
    createProfile(formData, history);
  };

  // const suggestionSelect = (result, lat, lng, text) => {
  //   console.log(result);
  //   setFormData({ ...formData, address: result });
  // };

  return (
    <Fragment>
      <h1 className="text-center">Post an ad - 7 days</h1>
      <form className="container mb-5" onSubmit={onSubmit}>
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
                  id={service}
                  value={service}
                  name="services"
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
        {/* <label htmlFor="Address">Address *</label>
        <MapboxAutocomplete
          publicKey="pk.eyJ1Ijoic2VydmFsbGwiLCJhIjoiY2pndjRqejV2MWV1azMzcnRvYWVjazBrNCJ9.4FgwICwFPNnW58okWFoBww"
          inputClass="form-control"
          onSuggestionSelect={suggestionSelect}
          country="ch"
          placeholder="Rue de Montchoisy, Geneva, 1207"
          resetSearch={true}
        /> */}
        <InputGroup
          name="address"
          value={address}
          onChange={onChange}
          labels={addressLabel}
        />
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
  createProfile
})(withRouter(PostAnAdForm));
