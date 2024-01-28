import {
  ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAILED,
  RESET_ORDER
} from '../actions/order';
import { TOrderActions } from '../actions/order';


type TOrderState = {
  name?: string;
  order: {
    number: number | null;
  };
  success: boolean;
  isLoading: boolean;
  hasError: boolean;
  status: string;
  substatus: string;
};

const orderInitialState: TOrderState = {
  name: '',
  order: {
    number: null
  },
  success: false,
  isLoading: true,
  hasError: false,
  status: '',
  substatus: ''
};

export const orderReducer = (store = orderInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...store,
        isLoading: true,
        hasError: false,
        status: 'Ваш последний заказ будет готов через ',
        substatus: 'Дождитесь готовности на орбитальной станции'
      };
    }
    case ORDER_REQUEST_SUCCESS: {
      return {
        ...store,
        name: action.payload.name,
        order: {
          ...store.order,
          number: action.payload.order.number
        },
        success: action.payload.success,
        isLoading: false,
        status: 'Заказ готов!',
        substatus: 'Вы можете просмотреть все свои заказы в Личном кабинете'
      };
    }
    case ORDER_REQUEST_FAILED: {
      return {
        ...store,
        isLoading: false,
        hasError: true
      };
    }
    case RESET_ORDER: {
      return {
        ...store,
        ...orderInitialState
      };
    }
    default: {
      return store;
    }
  }
};
