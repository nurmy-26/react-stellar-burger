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
import { TWebSocketActions } from '../actions/web-socket';
import { TOrder, TOrders } from '../../utils/types';


type TWebSocketState = {
  orders: TOrders | null;
  error?: string;
  openedOrder: TOrder;
  isLoading: boolean;
  hasError: boolean;
};

const wsInitialState: TWebSocketState = {
  orders: null,
  error: undefined,
  openedOrder: {
    createdAt: "",
    ingredients: [],
    name: "",
    number: 0,
    status: "",
    updatedAt: "",
    _id: "",
  },
  isLoading: false,
  hasError: false
};

export const wsReducer = (store = wsInitialState, action: TWebSocketActions): TWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...store,
        isLoading: true,
        hasError: false
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...store,
        error: undefined,
        isLoading: false
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...store,
        error: action.payload,
        isLoading: false,
        hasError: true
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...store,
        error: undefined,
        orders: null,
        isLoading: false,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...store,
        orders: action.payload
      };
    }
    case GET_ORDER: {
      return {
        ...store,
        isLoading: true,
        hasError: false
      };
    }
    case SET_ORDER_INFO: {
      return {
        ...store,
        openedOrder: action.payload,
        isLoading: false
      };
    }
    case GET_ORDER_FAILED: {
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
