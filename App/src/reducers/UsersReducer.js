import {
  ITEMS_FETCH,
  ITEMS_IS_LOADING,
  ITEMS_HAS_ERRORED,
  ITEMS_FETCH_DATA_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  hasErrored: false,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEMS_FETCH:
      return { ...state, isLoading: true, hasErrored: false };
    case ITEMS_FETCH_DATA_SUCCESS:
      return { ...state, items: action.payload };
    case ITEMS_HAS_ERRORED:
      return { ...state, ...INITIAL_STATE, hasErrored: true, isLoading: false };
    case ITEMS_IS_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
