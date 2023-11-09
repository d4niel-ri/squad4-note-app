import { produce } from 'immer';

import { SET_LOGIN, SET_TOKEN, LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST } from '@containers/Client/constants';

export const initialState = {
  user: null,
  register: null,
  login: false,
  token: null,
};

export const storedKey = ['token', 'login'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case LOGIN_REQUEST:
        draft.user = action.auth;
        break;
      case REGISTER_REQUEST:
        draft.register = action.data;
        break;
      case LOGOUT_REQUEST:
        draft.user = null;
        draft.login = false;
        break;
    }
  });

export default clientReducer;
