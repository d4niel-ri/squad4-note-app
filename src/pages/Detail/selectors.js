import { createSelector } from 'reselect';

import { initialState } from '@pages/Detail/reducer';

const selectDetailState = (state) => state.detail || initialState;

export const selectNote = createSelector(selectDetailState, (state) => state.note);
export const selectLoading = createSelector(selectDetailState, (state) => state.loading);
