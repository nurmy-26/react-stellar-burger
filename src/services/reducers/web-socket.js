import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/web-socket';


const wsInitialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  hasError: false
};

export const wsReducer = (store = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...store,
        wsConnected: true,
        error: undefined
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...store,
        wsConnected: true,
        error: undefined
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...store,
        wsConnected: false,
        error: action.payload,
        hasError: true
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...store,
        wsConnected: false,
        error: undefined,
        orders: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...store,
        error: undefined,
        orders: action.payload
      };
    }
    default: {
      return store;
    }
  }
};
