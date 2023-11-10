/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import addNoteSaga from '@pages/AddNote/saga';
import loginSaga from '@containers/Client/saga';
import detailSaga from '@pages/Detail/saga';

export default function* rootSaga() {
  // eslint-disable-next-line no-undef
  yield all([appSaga(), homeSaga(), addNoteSaga(), loginSaga(), detailSaga()]);
}
