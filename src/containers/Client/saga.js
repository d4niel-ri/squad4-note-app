import { takeLatest, call, put } from 'redux-saga/effects';

import { loginError, setLogin, setUser } from './actions';

import { getAllUsers, register } from '@domain/api';

import { LOGIN_REQUEST, REGISTER_REQUEST } from './constants';

export function* handleLogin({ auth }) {
  try {
    const users = yield call(getAllUsers);
    const userWithEmail = users.find((user) => user.email === auth.email && user.password === auth.password);

    if (userWithEmail) {
      yield put(setUser(userWithEmail));
      yield put(setLogin(true));
      window.location.reload();
    } else {
      yield put(loginError('Email and Password do not match'));
    }
  } catch (error) {
    yield put(error);
  }
}
export function* handleRegister({ data, handle }) {
  try {
    const users = yield call(getAllUsers);
    const { email, username } = data;

    const userExists = users.some((user) => user.email === email || user.username === username);

    if (userExists) {
      yield put(loginError('A user with the same email or username already exists.'));
    } else {
      const newUser = yield call(register, data);
      yield call(handle);
    }
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
