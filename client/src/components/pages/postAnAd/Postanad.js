import React from "react";
import PricingCard from "./PricingCard";
import { Link } from "react-router-dom";

// import {CardElement, injectStripe} from 'react-stripe-elements';

const Postanad = () => {
  return (
    <div>
      <h1 className="text-center my-5">
        We offer you three different pricing plans
      </h1>
      <blockquote className="blockquote text-center">
        <Link to={"/postanadform"}>
          <cite title="Source Title">Go back to post your ad</cite>
        </Link>
      </blockquote>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard
              days="7 days"
              subscription_plan="7"
              price="Free"
              amount="0"
            />
          </div>

          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard
              subscription_plan="30"
              days="30 days"
              price="90.00"
              currency="CHF"
              badge="THE MOST POPULAR"
              buttonStyle="full"
              amount={90}
            />
          </div>

          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard
              subscription_plan="90"
              days="90 days"
              price="240.00"
              currency="CHF"
              extra="Photo shoots offered"
              amount={240}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postanad;
