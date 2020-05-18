import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../../styles/PricingCard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  subscribePlan,
  getCurrentAgency,
  payment,
} from "../../../actions/agencyProfile";

const AgencyFreePlanCard = ({
  subscribePlan,
  agency: { agency, loading },
  days,
  subscription_plan,
  price,
  badge,
  currency,
  buttonStyle,
}) => {
  useEffect(() => {
    getCurrentAgency();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentAgency]);

  const onClick = () => {
    const time = { subscription_plan };

    subscribePlan(time);
  };

  console.log(agency);

  return (
    <div className="card h-100">
      <div className="card-body text-center">
        <span className="badge badge-secondary mt-2 mb-3 p-2 ">{badge}</span>
        <h6 className="card-title pb-3 time">{days}</h6>
        <h3 className="card-title pricing">
          {price} <sup>{currency}</sup>{" "}
        </h3>
        <p className="card-text description">Quick and easy registration</p>
        <strong>profile </strong> <span>custom</span>
        <br />
        <strong>visibility </strong> <span>total</span>
        <br />
        <strong>3000 visits / day </strong> <span>Xanibis.ch</span>
        <br />
      </div>
      <div className="card-footer text-center">
        <Link
          to="/agencyadform"
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

AgencyFreePlanCard.propTypes = {
  getCurrentAgency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  agency: state.agencyProfile,
});

export default connect(mapStateToProps, {
  payment,
  subscribePlan,
  getCurrentAgency,
})(AgencyFreePlanCard);
