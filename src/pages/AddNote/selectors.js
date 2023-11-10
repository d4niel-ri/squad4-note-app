import { createSelector } from 'reselect';
import { initialState } from './reducer';

const addNoteState = (state) => state.addNote || initialState;

export const selectNote = createSelector(addNoteState, (state) => state.note);
export const selectLoading = createSelector(addNoteState, (state) => state.loading);
