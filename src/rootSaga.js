/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@containers/Client/saga';
import detailSaga from '@pages/Detail/saga';

export default function* rootSaga() {
  yield all([appSaga(), loginSaga(), detailSaga()]);
}
