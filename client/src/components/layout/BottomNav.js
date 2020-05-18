import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const BottomNav = ({ auth: { isAuthenticated, loading, user } }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
        <div className="navbar d-flex ml-auto mr-auto">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-link mr-3"
                activeclassname="active"
              >
                <i className="fas fa-lg fa-home"></i>
              </NavLink>
            </li>

            <li className="nav-item">
              {!isAuthenticated ? (
                <NavLink
                  to="/auth"
                  className="nav-link mr-3"
                  activeclassname="active"
                >
                  <i className="fas fa-lg fa-user"></i>
                </NavLink>
              ) : (
                <NavLink
                  to="/dashboard"
                  className="nav-link"
                  activeclassname="active"
                >
                  <i className="fas fa-lg fa-user"></i>
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              <NavLink to="/webcamgirls" className="nav-link">
                <i className="fas fa-lg fa-camera"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(BottomNav);
