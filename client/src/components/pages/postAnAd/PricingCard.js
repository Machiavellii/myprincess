import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/PricingCard.css";
import { connect } from "react-redux";

import { subscribePlan } from "../../../actions/profile";

// import StripeCheckout from "react-stripe-checkout";

const PricingCard = ({
  subscribePlan,
  days,
  subscription_plan,
  price,
  badge,
  currency,
  extra,
  buttonStyle,
  amount
}) => {
  const onClick = () => {
    const time = { subscription_plan };

    subscribePlan(time);
  };

  // const Checkout = ({ name, description, amount }) =>
  // <StripeCheckout

  //   // description={description}
  //   amount
  //   label='Start'
  //   // token={onToken(amount, description)}
  //   currency
  //   stripeKey={'pk_test_2QL8V6xKMDyfzQc87dCmfPXU'}
  // />

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
        <strong>Support </strong> <span>free</span>
        <br />
      </div>
      <div className="card-footer text-center">
        <Link
          to="/postanadform"
          className={"btn " + (buttonStyle ? "full" : "empty")}
          onClick={() => onClick()}
        >
          {/* <Checkout /> */}
          Start
          <i className="fas fa-caret-right right-icon" />
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { subscribePlan })(PricingCard);
