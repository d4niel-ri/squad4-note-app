import { takeLatest, call, put } from 'redux-saga/effects';
import { addNote } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { ADD_NOTE } from './constants';

function* doAddNote({ note, navigate }) {
  yield put(setLoading(true));
  try {
    yield call(addNote, note);
    yield call(navigate);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* addNoteSaga() {
  yield takeLatest(ADD_NOTE, doAddNote);
}
