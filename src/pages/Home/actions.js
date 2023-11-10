/* eslint-disable arrow-body-style */
import { GET_ALL_NOTES, SET_ALL_NOTES, DELETE_NOTE } from './constants';

export const getAllNotes = (idUser) => {
  return {
    type: GET_ALL_NOTES,
    idUser,
  };
};

export const setAllNotes = (notes) => ({
  type: SET_ALL_NOTES,
  notes,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId,
});
