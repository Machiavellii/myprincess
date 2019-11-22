import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({
  component: Component,
  auth: { authenticatedAdmin, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !authenticatedAdmin && !loading ? (
        <Redirect to="/superadminlogin" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth
});

export default connect(mapStateToProps)(AdminRoute);
