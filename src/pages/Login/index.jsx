import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import LoginIcon from '@static/images/login.svg';

import { loginRequest } from '@containers/Client/actions';
import { selectUser, selectError } from '@containers/Client/selectors';

import style from './style.module.scss';

const Login = ({ userData, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (name, value) => {
    let errors = {};
    if (name === 'email') {
      if (!value) {
        errors.email = 'Email is required';
      }
    }
    if (name === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      ...validateForm(name, value),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {
      ...validateForm('email', formData.email),
      ...validateForm('password', formData.password),
    };
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
    } else {
      setFormErrors({});
      dispatch(loginRequest(formData));
    }
  };

  const handleSignup = () => {
    navigate('/Register');
  };

  useEffect(() => {
    if (userData) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className={style.loginContainer}>
      <div className={style.imageContainer}>
        <div className={style.titleImage}>
          <FormattedMessage id="app_login_title" />
        </div>
        <div className={style.slogan}>
          <FormattedMessage id="app_login_slogan" />
        </div>
        <img src={LoginIcon} alt="icon" />
        <div className={style.description}>
          <FormattedMessage id="app_login_description" />
        </div>
      </div>

      <div className={style.formContainer}>
        <div className={style.container}>
          <div className={style.titleForm}>
            <div className={style.title}>
              <FormattedMessage id="app_login_hello" />
            </div>
            <div className={style.greetings}>
              <FormattedMessage id="app_login_greetings" />
            </div>
          </div>
          <div className={style.inputContainer}>
            <div className={style.error}>{error}</div>
            <div className={style.inputCont}>
              <div className={style.error}>{formErrors.email}</div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={style.inputCont}>
              <div className={style.error}>{formErrors.password}</div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={style.buttonContainer}>
            <button onClick={handleLogin}>
              <FormattedMessage id="app_login_button" />
            </button>
          </div>
          <div className={style.signContainer}>
            <div className={style.signText}>
              <FormattedMessage id="app_login_register" />
            </div>
            <div className={style.signup} onClick={handleSignup}>
              <FormattedMessage id="app_login_signup" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  userData: PropTypes.object,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userData: selectUser,
  error: selectError,
});

export default connect(mapStateToProps)(Login);
