import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import { getAgencyProfiles } from '../../actions/agencyProfile';
import PropTypes from 'prop-types';

import '../../styles/landing.css';
import Content from './landingpages/Content';
// import LatestAds from './landingpages/landingcontent/LatestAds';
import LandingCanton from './landingpages/LandingCanton';
import LandingDescribe from './landingpages/LandingDescribe';
import Spinner from '../layout/Spinner';

// import { useTranslation } from 'react-i18next';

const Landing = ({ getProfiles, profile, getAgencyProfiles, agency }) => {
  // const { t, i18n } = useTranslation();

  useEffect(() => {
    getAgencyProfiles();
    getProfiles();
  }, [getProfiles, getAgencyProfiles]);

  const [covidToggle, setCovidToggle] = useState(false);
  const onChange = e => {
    setCovidToggle(!covidToggle);
  };

  return (
    <Fragment>
      {profile.profiles === null ||
      profile.loading ||
      agency.agencies === null ||
      agency.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="container mt-5">
            <div className="card p-2 mb-4">
              <h5 className="covid-title" onClick={onChange}>
                Please read this important note about Covid-19 pandemic
              </h5>
              {covidToggle ? (
                <p className="lead">
                  Dear clients, <br />
                  <br /> Because of the pandemic Covid-19, the authorities have
                  taken exceptional measures FOR ANY SECURITY 👍 <br />
                  <br />
                  Take care of yourself and others and opt for distance
                  services, we recently added webcam link to our site, so our
                  girls can offer webcam sesions, and please don't contact them
                  for some other purpose
                  <br />
                  <br />
                  Your Xanibis Team
                </p>
              ) : null}
            </div>
            <div className="holder-line">
              <span className="sep-holder holder-1">
                <span className="line"></span>
              </span>
              <h4>LATEST ADS</h4>
              <span className="sep-holder holder-2">
                <span className="line"></span>
              </span>
            </div>
            {profile.profiles.length > 0 ? (
              <Content profile={profile} agency={agency} />
            ) : (
              <Spinner />
            )}
            {/* <LatestAds /> */}
          </div>
          <LandingCanton />
          <div className="container">
            <LandingDescribe />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getAgencyProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  agency: state.agencyProfile
});

export default connect(mapStateToProps, { getProfiles, getAgencyProfiles })(
  Landing
);
