import { takeLatest, call, put } from 'redux-saga/effects';
import { addNoteApi, getAllNotes } from '@domain/api';
import { setAllNotes } from '@pages/Home/actions';
import { showPopup, setLoading } from '@containers/App/actions';
import { ADD_NOTE } from './constants';

function* doAddNote(action) {
  const { notes } = action;
  yield put(setLoading(true));
  try {
    yield call(addNoteApi, notes);
    const response = yield call(getAllNotes);
    yield put(setAllNotes(response));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* addNoteSaga() {
  yield takeLatest(ADD_NOTE, doAddNote);
}
