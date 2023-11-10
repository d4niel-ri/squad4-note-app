import { DELETE_NOTE, GET_NOTE_BY_ID, SET_LOADING, SET_NOTE, UPDATE_NOTE } from './constants';

export const getNoteByID = (id) => ({
  type: GET_NOTE_BY_ID,
  id,
});

export const setNote = (note) => ({
  type: SET_NOTE,
  note,
});

export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  note,
});

export const deleteNote = (id, navigate) => ({
  type: DELETE_NOTE,
  id,
  navigate,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});
