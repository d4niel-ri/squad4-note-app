import { React, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './style.module.scss';

import RegisterIcon from '@static/images/signup.svg';

import { registerRequest } from '@containers/Client/actions';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerRequest(formData));
  };
  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <div className={style.registerContainer}>
      <div className={style.imageContainer}>
        <div className={style.titleImage}>
          <FormattedMessage id="app_login_title" />
        </div>
        <div className={style.slogan}>
          <FormattedMessage id="app_login_slogan" />
        </div>
        <img src={RegisterIcon} alt="icon" />
        <div className={style.description}>
          <FormattedMessage id="app_login_description" />
        </div>
      </div>

      <div className={style.formContainer}>
        <div className={style.container}>
          <div className={style.titleForm}>
            <div className={style.title}>
              <FormattedMessage id="app_register_hello" />
            </div>
            <div className={style.greetings}>
              <FormattedMessage id="app_register_greetings" />
            </div>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={style.buttonContainer}>
            <button onClick={handleRegister}>
              <FormattedMessage id="app_register_button" />
            </button>
          </div>
          <div className={style.signContainer}>
            <div className={style.signText}>
              <FormattedMessage id="app_register_login" />
            </div>
            <div className={style.login} onClick={handleLogin}>
              <FormattedMessage id="app_login_button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
