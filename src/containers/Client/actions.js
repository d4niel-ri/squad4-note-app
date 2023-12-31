import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const registerRequest = (data, handleSuccess) => {
  return {
    type: REGISTER_REQUEST,
    data,
    handleSuccess,
  };
};

export const loginRequest = (auth) => {
  return {
    type: LOGIN_REQUEST,
    auth,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
