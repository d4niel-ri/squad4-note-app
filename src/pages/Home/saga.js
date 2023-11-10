import { takeLatest, call, put } from 'redux-saga/effects';
import { getAllNotes, deleteNote } from '@domain/api';
import { setAllNotes } from '@pages/Home/actions';
import { showPopup, setLoading } from '@containers/App/actions';
import { GET_ALL_NOTES, DELETE_NOTE } from './constants';

function* doFetch(action) {
  const { idUser } = action;
  yield put(setLoading(true));
  try {
    const response = yield call(getAllNotes, idUser);
    yield put(setAllNotes(response));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doDelete(action) {
  const { noteId } = action;
  yield put(setLoading(true));
  try {
    yield call(deleteNote, noteId);
    const response = yield call(getAllNotes);
    yield put(setAllNotes(response));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_NOTES, doFetch);
  yield takeLatest(DELETE_NOTE, doDelete);
}
