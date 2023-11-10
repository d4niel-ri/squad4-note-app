import { createSelector } from 'reselect';
import { initialState } from './reducer';

const addNoteState = (state) => state.addNote || initialState;

export const selectNotes = createSelector(addNoteState, (state) => state.notes);
