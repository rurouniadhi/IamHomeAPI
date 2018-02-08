import { Actions } from 'react-native-router-flux';
import {
  ITEMS_FETCH,
  ITEMS_IS_LOADING,
  ITEMS_HAS_ERRORED,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEM_UPDATE
} from './types';

const url = 'http://192.168.1.247:45458/api/users/';

export const itemSave = ({ Id, Name, Email, PhoneNumber, Status }) => {
  return () => {
    fetch(url + Id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id,
        Name,
        Email,
        PhoneNumber,
        Status
      })
    })
    .then((response) => {
        console.log(response);
        Actions.home();
    })
    .catch((err) => console.log(err));
  };
};

export const itemsFetchData = () => {
    return (dispatch) => {
      dispatch({ type: ITEMS_FETCH });
      fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            itemsIsLoading(dispatch);
            return response;
        })
        .then((response) => response.json())
        .then((items) => {
          itemsFetchDataSuccess(dispatch, items);
        })
        .catch(() => itemsHasErrored(dispatch));
    };
};

const itemsHasErrored = (dispatch, bool) => {
    dispatch({
        type: ITEMS_HAS_ERRORED,
        payload: bool
    });
};

const itemsIsLoading = (dispatch, bool) => {
    dispatch({
        type: ITEMS_IS_LOADING,
        payload: bool
    });
};

const itemsFetchDataSuccess = (dispatch, items) => {
    dispatch({
        type: ITEMS_FETCH_DATA_SUCCESS,
        payload: items
    });
};

export const itemUpdate = ({ prop, value }) => {
  return {
    type: ITEM_UPDATE,
    payload: { prop, value }
  };
};

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}
