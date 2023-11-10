import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import addNoteSaga from '@pages/AddNotes/saga';

export default function* rootSaga() {
  // eslint-disable-next-line no-undef
  yield all([appSaga(), homeSaga(), addNoteSaga()]);
}
