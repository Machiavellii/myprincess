import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import { loginAdmin } from "../../actions/adminAuth";

const LoginAdmin = ({ authenticatedAdmin, loginAdmin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginAdmin(username, password);
  };

  if (authenticatedAdmin) {
    return <Redirect to="/superadmin" />;
  }

  return (
    <div className="container">
      <form className="px-3" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Username *</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter Password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-form">
          Log in
        </button>
      </form>
      {/* <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p> */}
    </div>
  );
};

LoginAdmin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  authenticatedAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  authenticatedAdmin: state.adminAuth.authenticatedAdmin
});

export default connect(mapStateToProps, { loginAdmin })(LoginAdmin);
