import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAgencyProfileById } from '../../../../../actions/agencyProfile';
import { Link } from 'react-router-dom';
import Spinner from '../../../../layout/Spinner';

import '../../../../../styles/singleGirl.css';

import Carousel from './carousel/Carousel';
import Header from './describeAgency/componentAgency/HeaderAgency';
import DescribeGirl from './describeAgency/Agency';
import GalleryHolder from './gallery/GalleryHolderAgency';

const DescribeAgency = ({
  getAgencyProfileById,
  agency: { agency, loading },
  match
}) => {
  useEffect(() => {
    getAgencyProfileById(match.params.id);
  }, [getAgencyProfileById, match.params.id]);

  return (
    <Fragment>
      {agency === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="btn-holder">
            <Link to="/" className="btn btn-light">
              Back
            </Link>
          </div>
          <Carousel photos={agency.photos} />
          <div className="holder">
            <Header agency={agency} />
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-8">
                  <DescribeGirl agency={agency} />
                </div>
                <div className="col-sm-12 col-md-4 gallery">
                  <GalleryHolder agency={agency} />
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
  agency: state.agencyProfile
});

export default connect(mapStateToProps, {
  getAgencyProfileById
})(DescribeAgency);
