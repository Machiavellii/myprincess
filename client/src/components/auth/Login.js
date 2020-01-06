import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import { login, logout } from "../../actions/auth";
import { emailLabel, passwordLabel } from "../common/consts";

import InputGroup from "../common/InputGroup";

const Login = ({ isAuthenticated, login, auth, logout }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  const userBlock = auth.user ? auth.user.payload.user.block : "";

  if (userBlock === false) {
    logout();
    return <Redirect to="/blocked" />;
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container">
      <form className="px-3" onSubmit={e => onSubmit(e)}>
        <InputGroup
          type="email"
          name="email"
          placeholder={"Enter Email"}
          onChange={onChange}
          labels={emailLabel}
          value={email}
        />
        <InputGroup
          type="password"
          name="password"
          placeholder={"Enter Password"}
          onChange={onChange}
          labels={passwordLabel}
          minLength="6"
          value={password}
        />

        <button type="submit" className="btn btn-form">
          Log in
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { login, logout })(Login);
