import React from "react";

const HeaderAgency = ({ agency }) => {
  const {
    user: { nickname },
    phone,
    slogan,
  } = agency;

  return (
    <div className="headerGirl">
      <div className="container">
        <h1>{nickname}</h1>
        <p className="subheading">{slogan}</p>
        <a href={`tel:${phone}`}>
          <i className="fas fa-phone rotate" /> {phone}
        </a>
      </div>
    </div>
  );
};

export default HeaderAgency;
