import { produce } from 'immer';

import { SET_LOGIN, SET_TOKEN, LOGIN_REQUEST } from '@containers/Client/constants';

export const initialState = {
  user: null,
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
        draft.error = null;
        draft.login = true;
        break;
    }
  });

export default clientReducer;
