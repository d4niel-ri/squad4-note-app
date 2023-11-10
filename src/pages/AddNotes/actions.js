/* eslint-disable arrow-body-style */
import { ADD_NOTE } from './constants';

export const addNotesAction = (notes) => {
  return { type: ADD_NOTE, notes };
};
