import { produce } from 'immer';

import { ADD_NOTE } from './constants';

export const initialState = {
  notes: {
    title: '',
    description: '',
  },
};

export const storedKey = ['note'];

const addNoteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_NOTE:
        draft.notes = { ...state.notes, ...action.payload };
        break;
    }
  });

export default addNoteReducer;
