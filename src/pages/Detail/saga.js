import { takeLatest, call, put } from 'redux-saga/effects';
import { deleteNote, getNoteByID, updateNote } from '@domain/api';
import { showPopup } from '@containers/App/actions';
import { setLoading, setNote } from './actions';
import { DELETE_NOTE, GET_NOTE_BY_ID, UPDATE_NOTE } from './constants';

function* doGetNoteByID({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getNoteByID, id);
    yield put(setNote(response[0]));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doUpdateNote({ note }) {
  console.log(note, '<< Do Update Note');
  yield put(setLoading(true));
  try {
    const response = yield call(updateNote, note);
    yield put(setNote(response));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doDeleteNote({ id, navigate }) {
  yield put(setLoading(true));
  try {
    yield call(deleteNote, id);
    yield call(navigate);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* detailSaga() {
  yield takeLatest(GET_NOTE_BY_ID, doGetNoteByID);
  yield takeLatest(UPDATE_NOTE, doUpdateNote);
  yield takeLatest(DELETE_NOTE, doDeleteNote);
}
