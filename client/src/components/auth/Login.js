import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';
import { login } from '../../actions/auth';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container">
      <form className="px-3" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            value={email}
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
