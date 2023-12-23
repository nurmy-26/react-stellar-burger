import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/web-socket';
import { socketStates } from '../middleware/socket-states';


const wsInitialState = {
  wsConnection: socketStates.CLOSED,
  orders: [],
  error: undefined
};

export const wsReducer = (store = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...store,
        wsConnection: socketStates.CONNECTING
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...store,
        wsConnection: socketStates.OPEN,
        error: undefined
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...store,
        error: action.payload
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...store,
        wsConnection: socketStates.CLOSED,
        error: undefined,
        orders: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...store,
        orders: action.payload
      };
    }
    default: {
      return store;
    }
  }
};
