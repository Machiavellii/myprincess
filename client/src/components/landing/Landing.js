import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

import '../../styles/landing.css';
import Content from './landingpages/Content';
// import LatestAds from './landingpages/landingcontent/LatestAds';
import LandingCanton from './landingpages/LandingCanton';
import LandingDescribe from './landingpages/LandingDescribe';
import Spinner from '../layout/Spinner';

// import { useTranslation } from 'react-i18next';

const Landing = ({ getProfiles, profile }) => {
  // const { t, i18n } = useTranslation();

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {profile.profiles === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="header">
            {/* <span>{t('Directory.1')}</span> */}
            <span></span>
          </div>
          <div className="container mt-5">
            <div className="holder-line">
              <span className="sep-holder holder-1">
                <span className="line"></span>
              </span>
              <h4>VIP</h4>
              <span className="sep-holder holder-2">
                <span className="line"></span>
              </span>
            </div>

            {profile.profiles.length > 1 ? (
              <Content profile={profile} />
            ) : (
              <Spinner />
            )}

            <div className="holder-line">
              <span className="sep-holder holder-1">
                <span className="line"></span>
              </span>
              <h4>LATEST ADS</h4>
              <span className="sep-holder holder-2">
                <span className="line"></span>
              </span>
            </div>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Landing);
