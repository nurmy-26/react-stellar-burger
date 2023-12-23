import {
  ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAILED,
  RESET_ORDER
} from '../actions/order';


const orderInitialState = {
  // name и number будут массивами, если нужно будет сохранять все сделанные заказы
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

export const orderReducer = (store = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...store,
        isLoading: true,
        hasError: false,
        status: 'Ваш заказ будет готов через ',
        substatus: 'Дождитесь готовности на орбитальной станции'
      };
    }
    case ORDER_REQUEST_SUCCESS: {
      return {
        ...store,
        name: action.order.name,
        order: {
          ...store.order,
          number: action.order.order.number
        },
        success: action.order.success,
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
