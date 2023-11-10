import { produce } from 'immer';
import { SET_LOADING, SET_NOTE } from '@pages/Detail/constants';

export const initialState = {
  note: null,
  loading: false,
};

export const storedKey = [];

const detailReducer = (state = initialState, action) =>
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

export default detailReducer;
