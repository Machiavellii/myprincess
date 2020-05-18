import React, { Fragment, useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createAgencyProfile } from "../../../actions/agencyProfile";

import { agencyCategoryList, servicesList } from "../../../constants/data.json";

import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import TextAreaGroup from "../../common/TextAreaGroup";
import {
  sloganLabel,
  descriptionLabel,
  addressLabel,
  businesshoursLabel,
  rateLabel,
  phonenumberLabel,
  websiteLabel,
  numberOfGirlsLabel,
  categoryLabel,
  webcamlinkLabel
} from "../../common/consts";

const AgencyAdForm = ({
  createAgencyProfile,
  history,
  auth: isAuthenticated,
  agency: error
}) => {
  const [formData, setFormData] = useState({
    phone: "",
    category: "",
    services: [],
    description: "",
    address: "",
    is_active: "",
    rate: "",
    slogan: "",
    hours: "",
    website: "",
    webcamlink: "",
    recruitment: "",
    numberOfGirls: ""
  });

  const {
    phone,
    category,
    services,
    description,
    address,
    rate,
    slogan,
    hours,
    website,
    webcamlink,
    numberOfGirls
  } = formData;

  // useEffect(() => {
  //   if (error.error.length > 1) {
  //     setFormData({ ...formData });
  //     setTimeout(() => setFormData({ ...formData }), 5000);
  //   }
  // }, [error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    createAgencyProfile(formData, history);
  };

  return (
    <Fragment>
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

        <InputGroup
          name="slogan"
          placeholder={"Slogan"}
          onChange={onChange}
          labels={sloganLabel}
          value={slogan}
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
          options={agencyCategoryList}
          labels={categoryLabel}
        />

        <TextAreaGroup
          placeholder="Short Bio "
          name="description"
          value={description}
          onChange={onChange}
          //error={error}
          info="Tell us a little about yourself"
          labels={descriptionLabel}
        />

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
          //error={error}
          labels={businesshoursLabel}
        />

        <div className="form-group">
          <p>Are you recruting?</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="recruitment"
              id="recruting"
              value={true}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="recruting">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="recruitment"
              id="noRecruting"
              value={false}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="noRecruting">
              No
            </label>
          </div>
        </div>

        <InputGroup
          name="numberOfGirls"
          value={numberOfGirls}
          onChange={onChange}
          labels={numberOfGirlsLabel}
        />

        <TextAreaGroup
          placeholder="200"
          name="rate"
          value={rate}
          onChange={onChange}
          //error={error}
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
          Submit
        </button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  agency: state.agency
});

export default connect(mapStateToProps, {
  createAgencyProfile
})(withRouter(AgencyAdForm));
