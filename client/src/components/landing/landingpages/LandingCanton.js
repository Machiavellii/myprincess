import React from 'react';
import { Link } from 'react-router-dom';
import bern from '../../../img/cantons/bern.jpg';
import fribourg from '../../../img/cantons/fribourg.jpg';
import geneve from '../../../img/cantons/geneve.jpg';
import jura from '../../../img/cantons/jura.jpg';
import lucerne from '../../../img/cantons/lucerne.jpg';
import neuchatel from '../../../img/cantons/neuchatel.jpg';
import sion from '../../../img/cantons/sion.jpg';
import tessin from '../../../img/cantons/tessin.jpg';
import vaud from '../../../img/cantons/vaud.jpg';
import zurich from '../../../img/cantons/zurich.jpg';

const LandingCanton = () => {
  return (
    <div className="cantons mb-5">
      <div className="container">
        <div className="row">
          <div className="holder-line mt-5">
            <span className="sep-holder holder-1">
              <span className="line"></span>
            </span>
            <h4>THE ESCORTS HOTTEST GIRLS BY CANTON</h4>
            <span className="sep-holder holder-2">
              <span className="line"></span>
            </span>
          </div>

          <div className="custom-row container">
            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/bern">
                  <img src={bern} alt="Bern.jpg" />
                </Link>
                <span>Bern</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/fribourg">
                  <img src={fribourg} alt="Fribourg.jpg" />
                </Link>
                <span>Fribourg</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/genève">
                  <img src={geneve} alt="Geneve.jpg" />
                </Link>
                <span>Geneve</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/jura">
                  <img src={jura} alt="jura.jpg" />
                </Link>
                <span>Jura Mountains</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/lucerne">
                  <img src={lucerne} alt="lucerne.jpg" />
                </Link>
                <span>Lucerne</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/neuchatel">
                  <img src={neuchatel} alt="neuchatel.jpg" />
                </Link>
                <span>Neuchatel</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/tessin">
                  <img src={tessin} alt="tessin.jpg" />
                </Link>
                <span>Ticino</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/valais">
                  <img src={sion} alt="sion.jpg" />
                </Link>
                <span>Valais</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/vaud">
                  <img src={vaud} alt="vaud.jpg" />
                </Link>
                <span>Vaud</span>
              </div>
            </div>

            <div className="col-sm-12 col-custom">
              <div className="canton p-2 text-center">
                <Link to="/escorts-girls/zürich">
                  <img src={zurich} alt="zurich.jpg" />
                </Link>
                <span>Zurich</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCanton;
