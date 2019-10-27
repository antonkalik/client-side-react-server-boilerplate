import { UPDATE_STORE } from './constants';

export const actionUpdateStore = (payload = {}) => {
  return {
    type: UPDATE_STORE,
    payload,
  };
};
