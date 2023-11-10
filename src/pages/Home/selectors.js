import { createSelector } from 'reselect';
import { initialState } from './reducer';

const fetchHomeState = (state) => state.home || initialState;

export const selectNotes = createSelector(fetchHomeState, (state) => state.notes);
