import { LOGIN_REQUEST, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginRequest = (auth) => {
  console.log(auth, '<<<<');
  return {
    type: LOGIN_REQUEST,
    auth,
  };
};
