import React from 'react';

const Links = ({ profile }) => {
  const { services } = profile;
  return (
    <div className="list-holder">
      {services.map((service, i) => (
        <div className="first-list" key={i}>
          <li>
            <a href="!#">
              <i className="fas fa-check"></i>
              {service}
            </a>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Links;
