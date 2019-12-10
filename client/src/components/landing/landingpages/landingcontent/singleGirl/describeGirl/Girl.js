import React from "react";
import Review from "./componentGirls/Review";
import Links from "./componentGirls/Links";
import About from "./componentGirls/Aboutgirl";
import View from "./componentGirls/View";
import Opinions from "./componentGirls/Opinions";

const Girl = ({ profile }) => {
  return (
    <div className="describe-girl">
      <div className="container">
        <Review profile={profile} />
        <About profile={profile} />
        <Links profile={profile} />
        <Opinions profile={profile} />
        {/* {profile.opinions.length > 0 ? <Opinions profile={profile} /> : ""} */}
        <View profile={profile} />
      </div>
    </div>
  );
};

export default Girl;
