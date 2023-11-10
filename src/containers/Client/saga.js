import { takeLatest, call, put } from 'redux-saga/effects';

import { setLogin, setUser } from './actions';

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
      alert('User not found');
    }
  } catch (error) {
    yield put(error);
  }
}
export function* handleRegister(action) {
  try {
    const users = yield call(getAllUsers);
    const { email, username } = action.data;

    const userExists = users.some((user) => user.email === email || user.username === username);

    if (userExists) {
      alert('A user with the same email or username already exists.');
    } else {
      const newUser = yield call(register, action.data);
    }
  } catch (error) {
    alert(error.message);
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
