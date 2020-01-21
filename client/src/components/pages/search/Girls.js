import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Girls = ({ profiles }) => {
  let [tru, setTru] = useState(false);

  const redirect = () => {
    setTru((tru = true));
  };

  const filter =
    profiles.searchPage.length >= 1 ? profiles.searchPage : profiles.profiles;

  return (
    <div className="row">
      {filter.map(profile => (
        <div className="col-sm-6" key={profile._id}>
          <div className="card search-card" onClick={redirect}>
            {tru ? (
              <Redirect to={`/profile/user/${profile.user._id}`} />
            ) : (
              <Fragment>
                <img
                  src={profile.cover_photo}
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{profile.user.nickname}</h5>
                  <p className="card-text">
                    Student hot in {profile.location.city}
                  </p>
                  <Link to={`/profile/user/${profile.user._id}`}>
                    <i className="fas fa-map-marker-alt" />
                    {profile.location.formattedAddress}
                  </Link>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Girls;
