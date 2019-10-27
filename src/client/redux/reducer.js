import { createReducer } from '../utilities';
import { UPDATE_STORE } from './constants';

const initialState = {};

export default createReducer(initialState, {
  [UPDATE_STORE]: (state, { payload }) => {
    return {
      ...state,
      ...payload,
    };
  },
});
