import React from 'react';
import { Link } from 'react-router-dom';
import chloe from '../../../../img/girls/chloe.jpg';
import daniela from '../../../../img/girls/daniela.jpeg';
import ines from '../../../../img/girls/ines.jpeg';
import sara from '../../../../img/girls/sara.jpeg';

const LatestAds = () => {
  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <article className="content">
          <div className="contentHolder">
            <div className="top-holder">
              <Link to="/" className="links">
                Geneve
              </Link>
            </div>
            <Link to="/describe-content">
              <img src={chloe} alt="Chloe.jpg" className="img-fluid" />
            </Link>
            <div className="bottom-holder">
              <h5>
                <Link to="/" className="links link-name">
                  {' '}
                  Chloe
                </Link>
              </h5>
            </div>
          </div>
        </article>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <article className="content">
          <div className="contentHolder">
            <div className="top-holder">
              <Link to="/" className="links">
                Yverdon-les-bains
              </Link>
            </div>
            <Link to="/describe-content">
              <img src={daniela} alt="Daniela.jpg" className="img-fluid" />
            </Link>
            <div className="bottom-holder">
              <h5>
                <Link to="/" className="links link-name">
                  {' '}
                  Daniela
                </Link>
              </h5>
            </div>
          </div>
        </article>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <article className="content">
          <div className="contentHolder">
            <div className="top-holder">
              <Link to="/" className="links">
                Vaud
              </Link>
            </div>
            <Link to="/describe-content">
              <img src={sara} alt="Sara.jpg" className="img-fluid" />
            </Link>
            <div className="bottom-holder">
              <h5>
                <Link to="/" className="links link-name">
                  {' '}
                  Sara
                </Link>
              </h5>
            </div>
          </div>
        </article>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3">
        <article className="content">
          <div className="contentHolder">
            <div className="top-holder">
              <Link to="/" className="links">
                Nyon
              </Link>
            </div>
            <Link to="/describe-content">
              <img src={ines} alt="Ines.jpg" className="img-fluid" />
            </Link>
            <div className="bottom-holder">
              <h5>
                <Link to="/" className="links link-name">
                  {' '}
                  Ines
                </Link>
              </h5>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default LatestAds;
