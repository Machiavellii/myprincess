import React from "react";
import AgencyPricingCard from "./AgencyPricingCard";

const AgencyPricingPlan = () => {
  return (
    <div className="container">
      <div className="row justify-content-center p-3">
        <div className="col-md-4 col-sm-12">
          <AgencyPricingCard
            subscription_plan="30"
            days="30 days"
            price="120.00"
            currency="CHF"
            badge="THE MOST POPULAR"
            buttonStyle="full"
            amount={120}
          />
        </div>

        <div className="col-md-4 col-sm-12 ">
          <AgencyPricingCard
            subscription_plan="90"
            days="90 days"
            price="300.00"
            currency="CHF"
            extra="Photo shoots offered"
            amount={300}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyPricingPlan;
