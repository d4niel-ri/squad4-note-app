/* eslint-disable arrow-body-style */
import { ADD_NOTE, SET_LOADING, SET_NOTE } from './constants';

export const addNote = (note, navigate) => ({
  type: ADD_NOTE,
  note,
  navigate,
});

export const setNote = (note) => ({
  type: SET_NOTE,
  note,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});
