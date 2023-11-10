import { produce } from 'immer';

import { SET_LOADING, SET_NOTE } from './constants';

export const initialState = {
  note: {
    title: '',
    description: '',
  },
  loading: false,
};

export const storedKey = ['note'];

const addNoteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_NOTE:
        draft.note = action.note;
        break;

      case SET_LOADING:
        draft.loading = action.loading;
        break;
    }
  });

export default addNoteReducer;
