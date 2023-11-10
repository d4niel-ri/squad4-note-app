import { produce } from 'immer';

import {
  SET_LOGIN,
  SET_TOKEN,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  SET_USER,
  LOGIN_ERROR,
} from '@containers/Client/constants';

export const initialState = {
  user: null,
  login: false,
  token: null,
  error: null,
};

export const storedKey = ['token', 'login', 'user'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case LOGIN_REQUEST:
        draft.user = action.auth;
        break;
      case LOGOUT_REQUEST:
        draft.user = null;
        draft.login = false;
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
    }
  });

export default clientReducer;
