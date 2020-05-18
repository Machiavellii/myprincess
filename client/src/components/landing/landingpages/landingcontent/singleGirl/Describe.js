import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../../../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../../../../layout/Spinner';

import '../../../../../styles/singleGirl.css';

import Carousel from './carousel/Carousel';
import Header from './describeGirl/componentGirls/HeaderGirl';
import DescribeGirl from './describeGirl/Girl';
import GalleryHolder from './gallery/GalleryHolder';

const DescribeContent = ({
  getProfileById,
  profile: { profile, loading },
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="btn-holder">
            <Link to="/" className="btn btn-light">
              Back
            </Link>
          </div>
          <Carousel photos={profile.photos} />
          <div className="holder">
            <Header profile={profile} />
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-8">
                  <DescribeGirl profile={profile} />
                </div>
                <div className="col-sm-12 col-md-4 gallery">
                  <GalleryHolder profile={profile} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfileById
})(DescribeContent);
