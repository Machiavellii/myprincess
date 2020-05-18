import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import {
  getCurrentProfile,
  deleteAccount,
  typePlan,
} from "../../actions/profile";

import { getCurrentAgency, typePlanAgency } from "../../actions/agencyProfile";
import EscortDashboard from "./EscortDashboard";
import AgencyDashboard from "./AgencyDashboard";

const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  getCurrentAgency,
  agency: { agency },
  deleteAccount,
  typePlan,
  typePlanAgency,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentAgency();
  }, [getCurrentProfile, getCurrentAgency]);

  const [kindtype, setType] = useState(false);

  const [type, setFormData] = useState("");

  const onChange = (e) => {
    setType(!kindtype);
    setFormData({ type: e.target.value });
  };

  // const onClick = e => {
  //   typePlan(type);
  //   typePlanAgency(type);
  // };

  const renderPostAnAdButton = () => {
    return type.type === "agency" ? (
      <Fragment>
        <Link
          to="/agencypostanad"
          className="btn my-3 rose-border"
          style={{ backgroundColor: "#2b2b2b", color: "#fff" }}
          onClick={(e) => typePlanAgency(type)}
        >
          Post an Ad
        </Link>
      </Fragment>
    ) : (
      <Fragment>
        <Link
          to="/postanad"
          className="btn my-3 rose-border"
          style={{ backgroundColor: "#2b2b2b", color: "#fff" }}
          onClick={(e) => typePlan(type)}
        >
          Post an Ad
        </Link>
      </Fragment>
    );
  };

  const renderDashboard = () => {
    if (profile) {
      return <EscortDashboard />;
    } else if (agency) {
      return <AgencyDashboard />;
    } else {
      return (
        <Fragment>
          <div className="container m-5 dashboard-create">
            <p>You have not yet setup a profile, please add some info</p>
            <p className="mt-4">Please tell us are you Escort or an Agency?</p>
            <div className="form-group">
              <div className="form-check form-check-inline radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="escort"
                  value="escort"
                  onClick={onChange}
                />
                <label className="form-check-label" htmlFor="escort">
                  Escort
                </label>
              </div>
              <div className="form-check form-check-inline mb-3 radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="agency"
                  value="agency"
                  onClick={onChange}
                />
                <label className="form-check-label" htmlFor="agency">
                  Agency
                </label>
              </div>
            </div>

            <br />
            {!kindtype ? (
              <Link
                to="/postanad"
                className="btn disabled"
                style={{ backgroundColor: "#2b2b2b", color: "#fff" }}
              >
                Post an Ad
              </Link>
            ) : (
              renderPostAnAdButton()
            )}
          </div>
        </Fragment>
      );
    }
  };

  return loading && profile === null ? <Spinner /> : renderDashboard();
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentAgency: PropTypes.func.isRequired,
  agency: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  agency: state.agencyProfile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  getCurrentAgency,
  deleteAccount,
  typePlan,
  typePlanAgency,
})(Dashboard);
