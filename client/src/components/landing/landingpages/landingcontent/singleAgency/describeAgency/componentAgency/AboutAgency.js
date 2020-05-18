import React from "react";
import whatsapp from "../../../../../../../img/whatsapp.png";

const AboutAgency = ({ agency }) => {
  return (
    <div className="aboutGirl">
      <div className="whatsapp">
        <a
          href={`https://api.whatsapp.com/send?phone=${agency.phone}&text=Type Message`}
          target="_blank"
          className="a-rose"
          rel="noopener noreferrer"
        >
          Contact me by whatsapp <img src={whatsapp} alt="Whatsapp" />
        </a>
      </div>
      <p>{agency.description}</p>
    </div>
  );
};

export default AboutAgency;
