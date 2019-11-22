import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/PricingCard.css";

const PricingCard = props => {
  return (
    <div className="card mb-5">
      <div className="card-body text-center">
        <span className="badge badge-secondary mt-2 mb-3 p-2 ">
          {props.badge}
        </span>
        <h6 className="card-title pb-3 time">{props.time}</h6>
        <h3 className="card-title pricing">
          {props.price} <sup>{props.currency}</sup>{" "}
        </h3>
        <p className="card-text description">Quick and easy registration</p>
        <strong>{props.extra}</strong> <br />
        <strong>profile </strong> <span>custom</span>
        <br />
        <strong>visibility </strong> <span>total</span>
        <br />
        <strong>3000 visits / day </strong> <span>MyPrincess.ch</span>
        <br />
        <strong>Support </strong> <span>free</span>
        <br />
        <Link
          to="/postanadform"
          className={"btn " + (props.buttonStyle ? "full" : "empty")}
        >
          Start
          <i className="fas fa-caret-right right-icon" />
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
