import React from "react";
import whatsapp from "../../../../../../../img/whatsapp.png";

const Aboutgirl = ({ profile }) => {
  return (
    <div className="aboutGirl">
      <div className="whatsapp">
        <a
          href={`https://wa.me/${profile.phone}`}
          target="_blank"
          className="a-rose"
          rel="noopener noreferrer"
        >
          Contact me by whatsapp <img src={whatsapp} alt="Whatsapp" />
        </a>
      </div>
      <p>{profile.description}</p>
    </div>
  );
};

export default Aboutgirl;
