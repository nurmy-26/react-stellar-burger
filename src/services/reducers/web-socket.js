import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  GET_ORDER,
  SET_ORDER_INFO,
  GET_ORDER_FAILED
} from '../actions/web-socket';
import { socketStates } from '../middleware/socket-states';


const wsInitialState = {
  wsConnection: socketStates.CLOSED,
  orders: [],
  error: undefined,
  openedOrder: null,
  isLoading: false,
  hasError: false
};

export const wsReducer = (store = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      console.log('WS_CONNECTION_START')
      return {
        ...store,
        wsConnection: socketStates.CONNECTING,
        isLoading: true,
        hasError: false
      };
    }
    case WS_CONNECTION_SUCCESS: {
      console.log('WS_CONNECTION_SUCCESS')
      return {
        ...store,
        wsConnection: socketStates.OPEN,
        error: undefined,
        isLoading: false
      };
    }
    case WS_CONNECTION_ERROR: {
      console.log('WS_CONNECTION_ERROR')
      return {
        ...store,
        error: action.payload,
        isLoading: false,
        hasError: true
      };
    }
    case WS_CONNECTION_CLOSED: {
      console.log('WS_CONNECTION_CLOSED')
      return {
        ...store,
        wsConnection: socketStates.CLOSED,
        error: undefined,
        orders: [],
        isLoading: false,
      };
    }
    case WS_GET_MESSAGE: {
      console.log('WS_GET_MESSAGE')
      return {
        ...store,
        orders: action.payload
      };
    }
    case GET_ORDER: {
      console.log('GET_ORDER')
      return {
        ...store,
        isLoading: true,
        hasError: false
      };
    }
    case SET_ORDER_INFO: {
      console.log('SET_ORDER_INFO')
      return {
        ...store,
        openedOrder: action.payload,
        isLoading: false
      };
    }
    case GET_ORDER_FAILED: {
      console.log('GET_ORDER_FAILED')
      return {
        ...store,
        isLoading: false,
        hasError: true
      };
    }
    default: {
      return store;
    }
  }
};
