import { postOrder } from '../../utils/api';
import { AppDispatch, AppThunk, TOrder, TOrderResponse } from '../../utils/types';


export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED = 'ORDER_REQUEST_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

export type TOrderRequestAction = {
  readonly type: typeof ORDER_REQUEST;
};
export type TOrderRequestSuccessAction = {
  readonly type: typeof ORDER_REQUEST_SUCCESS;
  readonly payload: TOrderResponse;

};
export type TOrderRequestFailedAction = {
  readonly type: typeof ORDER_REQUEST_FAILED;
};
export type TResetOrderAction = {
  readonly type: typeof RESET_ORDER;
};

export type TOrderActions = TOrderRequestAction | TOrderRequestSuccessAction
  | TOrderRequestFailedAction | TResetOrderAction;


// генератор экшена для типа 'RESET_ORDER'
export const resetOrder = (): TResetOrderAction => {
  return {
    type: RESET_ORDER
  }
}

export const requestOrder: AppThunk = (arr: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ORDER_REQUEST
    });
    postOrder(arr).then(res => {
      dispatch({
        type: ORDER_REQUEST_SUCCESS,
        payload: res
      })
    })
    .catch(err => {
      dispatch({
        type: ORDER_REQUEST_FAILED
      })
      console.log(err)
    })
  }
}
