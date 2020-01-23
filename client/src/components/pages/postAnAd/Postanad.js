import React from "react";
import PricingCard from "./PricingCard";
import { Link } from "react-router-dom";

// import {CardElement, injectStripe} from 'react-stripe-elements';

const Postanad = () => {
  return (
    <div>
      <h4 className="text-center my-5">
        We offer you two different <Link to="/pricingplan">pricing plans</Link>
      </h4>
      <blockquote className="blockquote text-center"></blockquote>
      <div className="container p-3">
        <div className="col-md-4 col-sm-12 m-auto">
          <PricingCard
            days="7 days"
            subscription_plan="7"
            price="Free"
            amount="0"
          />
        </div>
      </div>
    </div>
  );
};

export default Postanad;
