import React from "react";
import AgencyFeePlanCard from "./AgencyFeePlanCard";
import { Link } from "react-router-dom";

const AgencyPostAnAd = () => {
  return (
    <div>
      <h4 className="text-center my-5">
        We offer you two different{" "}
        <Link to="/agencypricingplan">pricing plans</Link>
      </h4>
      <blockquote className="blockquote text-center"> </blockquote>
      <div className="container p-3">
        <div className="col-md-4 col-sm-12 m-auto">
          <AgencyFeePlanCard
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

export default AgencyPostAnAd;
