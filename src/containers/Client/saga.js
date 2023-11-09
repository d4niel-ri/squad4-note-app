import { takeLatest, call, put } from 'redux-saga/effects';
import { loginRequest } from './actions';
import { getAllUsers } from '@domain/api';
import { LOGIN_REQUEST } from './constants';

export function* handleLogin(action) {
  try {
    const users = yield call(getAllUsers);
    const userWithEmail = users.find(
      (user) => user.email === action.auth.email && user.password === action.auth.password
    );

    if (userWithEmail) {
      localStorage.setItem('user', JSON.stringify(userWithEmail));
    } else {
      alert('User not found');
    }
  } catch (error) {
    yield put(error);
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
