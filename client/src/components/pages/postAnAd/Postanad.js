import React from "react";
import PricingCard from "./PricingCard";

const Postanad = () => {
  return (
    <div>
      <h1 className="text-center my-5">Post an ad</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard days="7 days" subscription_plan="7" price="Free" />
          </div>

          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard
              subscription_plan="30"
              days="30 days"
              price="90.00"
              currency="CHF"
              badge="THE MOST POPULAR"
              buttonStyle="full"
            />
          </div>

          <div className="col-md-4 col-sm-12 col-12">
            <PricingCard
              subscription_plan="90"
              days="90 days"
              price="240.00"
              currency="CHF"
              extra="Photo shoots offered"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postanad;
