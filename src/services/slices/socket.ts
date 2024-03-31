import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../utils/types';
import { getOrderInfo } from '../../utils/api';
import { TOrder, TOrders } from '../../utils/types';

type TWebSocketState = {
  orders: TOrders | null;
  error?: string;
  openedOrder: TOrder;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TWebSocketState = {
  orders: null,
  error: undefined,
  openedOrder: {
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    status: '',
    updatedAt: '',
    _id: '',
  },
  isLoading: false,
  hasError: false,
};

const webSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    wsConnectionStart: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    wsConnectionSuccess: (state) => {
      state.error = undefined;
      state.isLoading = false;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.hasError = true;
    },
    wsConnectionClosed: (state) => {
      state.error = undefined;
      state.orders = null;
      state.isLoading = false;
    },
    wsGetMessage: (state, action: PayloadAction<TOrders>) => {
      state.orders = action.payload;
    },
    getOrder: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    setOrderInfo: (state, action: PayloadAction<TOrder>) => {
      state.openedOrder = action.payload;
      state.isLoading = false;
    },
    getOrderFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// вручную создаем экшены connect и disconnect
export const connect = createAction('socket/connect', (wsUrl: string | undefined) => ({
  payload: wsUrl,
}));
export const disconnect = createAction('socket/disconnect');

export type TWebSocketActions =
| ReturnType<typeof wsConnectionStart>
| ReturnType<typeof wsConnectionSuccess>
| ReturnType<typeof wsConnectionError>
| ReturnType<typeof wsConnectionClosed>
| ReturnType<typeof wsGetMessage>
| ReturnType<typeof getOrder>
| ReturnType<typeof setOrderInfo>
| ReturnType<typeof getOrderFailed>;

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
  getOrder,
  setOrderInfo,
  getOrderFailed,
} = webSocketSlice.actions;

export const requestOrderInfo = (number: number) => (dispatch: AppDispatch) => {
  dispatch(getOrder());
  getOrderInfo(number)
    .then((res) => {
      dispatch(setOrderInfo(res.orders[0]));
    })
    .catch((err) => {
      dispatch(getOrderFailed());
      console.log(err);
    });
};

export default webSocketSlice.reducer;
