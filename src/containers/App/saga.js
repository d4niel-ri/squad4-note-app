import { takeLatest, call, put } from 'redux-saga/effects';

import { ping, pingDB } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { PING, PINGDB } from '@containers/App/constants';

function* doPing() {
  yield put(setLoading(true));
  try {
    yield call(ping);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doPingDB() {
  yield put(setLoading(true));
  try {
    yield call(pingDB);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(PING, doPing);
  yield takeLatest(PINGDB, doPingDB);
}
