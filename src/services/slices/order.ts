import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postOrder } from '../../utils/api';
import { AppDispatch, TOrderResponse } from '../../utils/types';

interface TOrderState {
  name?: string;
  order: {
    number: number | null;
  };
  success: boolean;
  isLoading: boolean;
  hasError: boolean;
  status: string;
  substatus: string;
}

const initialState: TOrderState = {
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

const orderSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    orderRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.status = 'Ваш последний заказ будет готов через ';
      state.substatus = 'Дождитесь готовности на орбитальной станции';
    },
    orderRequestSuccess: (state, action: PayloadAction<TOrderResponse>) => {
      state.name = action.payload.name;
      state.order.number = action.payload.order.number;
      state.success = action.payload.success;
      state.isLoading = false;
      state.status = 'Заказ готов!';
      state.substatus = 'Вы можете просмотреть все свои заказы в Личном кабинете';
    },
    orderRequestFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    resetOrder: (state) => {
      return initialState;
    }
  }
});

export type TOrderActions =
  | ReturnType<typeof orderRequest>
  | ReturnType<typeof orderRequestSuccess>
  | ReturnType<typeof orderRequestFailed>
  | ReturnType<typeof resetOrder>;

export const { orderRequest, orderRequestSuccess, orderRequestFailed, resetOrder } = orderSlice.actions;

export const requestOrder = (arr: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch(orderRequest());
    postOrder(arr).then(res => {
      dispatch(orderRequestSuccess(res));
    })
    .catch(err => {
      dispatch(orderRequestFailed());
      console.log(err);
    });
  };
};

export default orderSlice.reducer;
