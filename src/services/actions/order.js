import { postOrder } from '../../utils/api';


export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED = 'ORDER_REQUEST_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

// генератор экшена для типа 'RESET_ORDER'
export const resetOrder = () => {
  return {
    type: RESET_ORDER
  }
}

export function requestOrder(arr) {
  return function(dispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    postOrder(arr).then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_REQUEST_SUCCESS,
          order: res
        });
      } else {
        dispatch({
          type: ORDER_REQUEST_FAILED
        });
      }
    });
  };
}
