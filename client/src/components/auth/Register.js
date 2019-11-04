import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';

const Register = ({ setAlert, isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    password2: ''
  });

  const { nickname, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ nickname, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <form className="p-5" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Nickname *</label>
          <input
            type="text"
            className="form-control"
            name="nickname"
            placeholder="Enter Nickname"
            value={nickname}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="text"
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
            minLength="6"
            placeholder="Enter Password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password *</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            minLength="6"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-form">
          {' '}
          Register
        </button>
        {/* <imput type="submit" value="Register"  /> */}
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
