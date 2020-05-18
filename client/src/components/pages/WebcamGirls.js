import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';

const WebcamGirls = ({ profiles: { profiles }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const webcamGirls = profiles.filter(profile => {
    if (profile.webcamlink) {
      return profile;
    }
  });

  return (
    <div className="container">
      {webcamGirls ? (
        <h4 className="text-center contact-form-heading mt-5">
          Best Webcam girls available
        </h4>
      ) : null}
      <div className="row">
        {!webcamGirls ? (
          <h4 className="text-center no-annoucments-heading">
            For now, no webcam girls available.
          </h4>
        ) : (
          webcamGirls.map(profile => (
            <div className="col-sm-6 col-md-4 col-lg-3 mt-5" key={profile._id}>
              <article className="content">
                <div className="contentHolder">
                  <div className="top-holder">
                    <Link to="/" className="links">
                      {profile.location.canton}
                    </Link>
                  </div>
                  <Link to={`/profile/user/${profile.user._id}`}>
                    <img
                      src={`https://myprincess.jcloud.ik-server.com/${profile.cover_photo}`}
                      alt=""
                      className="img-fluid"
                    />
                    {!profile.is_active ? (
                      <div className="inactive">
                        <h6>This announcement is currently inactive</h6>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Link>
                  <div className="bottom-holder">
                    <h5>
                      <Link to="/" className="links link-name">
                        {' '}
                        {profile.user.nickname}
                      </Link>
                    </h5>
                  </div>
                </div>
              </article>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profiles: state.profile
});

export default connect(mapStateToProps, { getProfiles })(WebcamGirls);
