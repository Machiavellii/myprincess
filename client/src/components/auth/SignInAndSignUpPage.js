import React from 'react';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

const SignInAndSignUpPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="row container mx-auto my-4">
      <div className="col col-md-6 col-sm-12 col-12 my-4">
        <Login />
      </div>
      <div className="col col-md-6 col-sm-12 col-12">
        <Register />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
