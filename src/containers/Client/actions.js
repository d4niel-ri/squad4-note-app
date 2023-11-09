import { LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const registerRequest = (data) => {
  return {
    type: REGISTER_REQUEST,
    data,
  };
};

export const loginRequest = (auth) => {
  return {
    type: LOGIN_REQUEST,
    auth,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
