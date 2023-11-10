import { produce } from 'immer';

import { SET_ALL_NOTES } from './constants';

export const initialState = {
  notes: [],
};

export const storedKey = ['notes'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_NOTES:
        draft.notes = action.notes;
        break;
    }
  });

export default homeReducer;
