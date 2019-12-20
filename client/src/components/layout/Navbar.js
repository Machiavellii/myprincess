import React, { Fragment, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../styles/navbar.css";
import Logo from "../../img/logo.png";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { filterFunc } from "../../actions/profile";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  filterFunc,
  profile
}) => {
  let [showHide, setShow] = useState(false);
  let [showInput] = useState("");
  const [filter, setFilter] = useState("");

  showInput = () => {
    setShow((showHide = !showHide));
  };

  const onChange = e => {
    setFilter(e.target.value);
    filterFunc(filter);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="top">
      {!loading && (
        <Fragment>
          {showHide ? (
            <div className="search-input-small">
              <input
                type="text"
                value={filter}
                className="form-control form-control-lg"
                placeholder="Que recherchez-vous"
                onChange={onChange}
              />
              <i className="fas fa-times"></i>
            </div>
          ) : null}
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={Logo} className="img-fluid" alt="logo.png" />
            </Link>
            <div className="search-bar mr-5">
              <input
                type="text"
                placeholder="Que recherchez-vous"
                value={filter}
                onChange={onChange}
              />
              <div className="icons">
                <Link to="/search" className="big-size mr-2">
                  <i className="fas fa-search" />
                </Link>
                <a href="#!" className="small-size" onClick={showInput}>
                  <i className={`fas fa-search ${showHide ? "opct" : ""}`} />
                </a>
              </div>
            </div>
            <div className="button-collapse">
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-expanded="false"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    to="/faq"
                    className="nav-link"
                    activeClassName="active"
                  >
                    FAQ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    className="nav-link"
                    activeclassname="active"
                  >
                    Contact
                  </NavLink>
                </li>
                {isAuthenticated ? (
                  <Fragment>
                    <div className="dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {user.nickname}
                      </a>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li className="nav-item">
                          <Link to="/dashboard" className="nav-link">
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/" onClick={logout} className="nav-link">
                            Logout
                          </Link>
                        </li>
                      </div>
                    </div>
                    {/* <li className="nav-item">
                        <NavLink
                          to="/postanad"
                          className="nav-link rose-border"
                        >
                          Post an ad
                        </NavLink>
                      </li> */}
                  </Fragment>
                ) : (
                  <Fragment>
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        className="nav-link"
                        activeclassname="active"
                      >
                        Sing in
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className="nav-link"
                        activeclassname="active"
                      >
                        Sing Up
                      </NavLink>
                    </li>
                  </Fragment>
                )}

                <li className="nav-item">
                  <a
                    href="https://m.facebook.com/myprincess.ch"
                    className="nav-link rose-border"
                    activeclassname="active"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout, filterFunc })(Navbar);
