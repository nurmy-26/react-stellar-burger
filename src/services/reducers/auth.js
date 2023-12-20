import {
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED,
  USER_RESET,
  SET_AUTH_CHECKED
} from '../actions/auth';


const authInitialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  hasError: false
};

export const authReducer = (store = authInitialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...store,
        isLoading: true,
        hasError: false
      };
    }
    case USER_REQUEST_SUCCESS: {
      return {
        ...store,
        user: action.user,
        isLoading: false
      };
    }
    case USER_REQUEST_FAILED: {
      return {
        ...store,
        isLoading: false,
        hasError: true
      };
    }
    case USER_RESET: {
      return {
        ...store,
        user: null,
        isLoading: false,
        hasError: false
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...store,
        isAuthChecked: action.checked
      };
    }
    default: {
      return store;
    }
  }
};
