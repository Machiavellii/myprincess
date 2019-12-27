import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Redirect, Link } from "react-router-dom";
import { register } from "../../actions/auth";

import {
  emailLabel,
  passwordLabel,
  nicknameRegister,
  passwordConfirmLabel
} from "../common/consts";
import InputGroup from "../common/InputGroup";

const Register = ({ setAlert, isAuthenticated, register }) => {
  let [block, setBlock] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    password2: ""
  });

  const { nickname, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCheckBox = e => {
    setBlock((block = !block));
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ nickname, email, password, block });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container">
      <form className="px-3" onSubmit={e => onSubmit(e)}>
        <InputGroup
          name="nickname"
          placeholder={"Enter Nickname"}
          onChange={onChange}
          labels={nicknameRegister}
          value={nickname}
          required
        />
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
        <InputGroup
          type="password"
          name="password2"
          placeholder={"Confirm Password"}
          onChange={onChange}
          labels={passwordConfirmLabel}
          minLength="6"
          value={password2}
        />
        <div className="form-group">
          <input
            className="form-group mr-2"
            type="checkbox"
            id="terms"
            value={block}
            onChange={e => onCheckBox(e)}
            name="terms"
            required
          />
          <label htmlFor="terms">
            I agree with{" "}
            <Link to="/terms" target="_blank">
              Terms
            </Link>
          </label>
        </div>
        <button type="submit" className="btn btn-form">
          {" "}
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
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

export default connect(mapStateToProps, { register, setAlert })(Register);
