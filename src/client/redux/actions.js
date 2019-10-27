import { UPDATE_STORE } from './constants';

export const updateStore = (payload = {}) => {
  return {
    type: UPDATE_STORE,
    data: {
      payload,
    },
  };
};
