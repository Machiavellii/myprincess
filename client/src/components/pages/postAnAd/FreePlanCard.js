import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link, Redirect } from 'react-router-dom';
import "../../../styles/PricingCard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  subscribePlan,
  getCurrentProfile,
  payment
} from "../../../actions/profile";

const PricingCard = ({
  subscribePlan,
  profile: { profile, loading },
  payment,
  days,
  subscription_plan,
  price,
  badge,
  currency,
  extra,
  buttonStyle,
  amount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const onClick = () => {
    const time = { subscription_plan };

    subscribePlan(time);
  };

  return (
    <div className="card h-100">
      <div className="card-body text-center">
        <span className="badge badge-secondary mt-2 mb-3 p-2 ">{badge}</span>
        <h6 className="card-title pb-3 time">{days}</h6>
        <h3 className="card-title pricing">
          {price} <sup>{currency}</sup>{" "}
        </h3>
        <p className="card-text description">Quick and easy registration</p>
        {/* <strong>{extra}</strong> <br /> */}
        <strong>profile </strong> <span>custom</span>
        <br />
        <strong>visibility </strong> <span>total</span>
        <br />
        <strong>3000 visits / day </strong> <span>MyPrincess.ch</span>
        <br />
      </div>
      <div className="card-footer text-center">
        <Link
          to="/postanadform"
          className={"btn " + (buttonStyle ? "full" : "empty")}
          onClick={() => onClick()}
        >
          Start
          <i className="fas fa-caret-right right-icon" />
        </Link>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  payment,
  subscribePlan,
  getCurrentProfile
})(PricingCard);
