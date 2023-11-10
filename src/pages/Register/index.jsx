import { React, useState, useEffect, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import style from './style.module.scss';

import RegisterIcon from '@static/images/signup.svg';
import PopUp from '@static/images/success.svg';

import { registerRequest } from '@containers/Client/actions';
import { selectUser, selectError } from '@containers/Client/selectors';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const Register = ({ userData, errorData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formData.username.length >= 4 ? '' : 'Username must be at least 4 character';
    tempErrors.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.password = formData.password.length >= 6 ? '' : 'Password must be at least 6 character';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handle = () => setOpen(true);

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerRequest(formData, handle));
    }
  };
  const handleLogin = () => {
    navigate('/Login');
  };
  useEffect(() => {
    if (userData) {
      navigate('/');
    } else {
      navigate('/Register');
    }
  }, [navigate]);

  return (
    <div className={style.registerContainer}>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', margin: '20px 0px 0px 0px' }}>
          <img style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 64px)' }} src={PopUp} alt="image" />
        </DialogContent>
        <Typography style={{ color: '#3BCC64', fontSize: '30px', fontWeight: '600', margin: '0px 20px 20px 20px' }}>
          <FormattedMessage id="app_register_popup" />
        </Typography>
        <DialogActions></DialogActions>
      </BootstrapDialog>

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
            {errorData && <div className={style.error}>{errorData}</div>}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className={style.error}>{errors.username}</div>}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className={style.error}>{errors.email}</div>}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className={style.error}>{errors.password}</div>}
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

Register.propTypes = {
  userData: PropTypes.object,
  errorData: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userData: selectUser,
  errorData: selectError,
});
export default connect(mapStateToProps)(Register);
