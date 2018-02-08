import {
  ITEM_UPDATE,
  ITEM_UPDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  status: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ITEM_UPDATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
