import React from "react";
import FreePlanCard from "./FreePlanCard";
import { Link } from "react-router-dom";

const Postanad = () => {
  return (
    <div>
      <h4 className="text-center my-5">
        We offer you two different <Link to="/pricingplan">pricing plans</Link>
      </h4>
      <blockquote className="blockquote text-center"> </blockquote>
      <div className="container p-3">
        <div className="col-md-4 col-sm-12 m-auto">
          <FreePlanCard
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
