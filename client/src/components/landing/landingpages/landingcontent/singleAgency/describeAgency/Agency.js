import React from "react";
import Review from "./componentAgency/Review";
import Links from "./componentAgency/Links";
import About from "./componentAgency/AboutAgency";
import View from "./componentAgency/View";
import Opinions from "./componentAgency/Opinions";

const Girl = ({ agency }) => {
  return (
    <div className="describe-girl">
      <div className="container">
        <Review agency={agency} />
        <About agency={agency} />
        <Links agency={agency} />
        <Opinions agency={agency} />
        {/* {agency.opinions.length > 0 ? <Opinions agency={agency} /> : ""} */}
        <View agency={agency} />
      </div>
    </div>
  );
};

export default Girl;
