import { getOrderInfo } from "../../utils/api";

// посылаем сами из компонента для подключения/выключения ws (будут приходить в мидлвар)
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNEC';

// диспатчит мидлвар при опр. событиях
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'; // успешно открыли подключение
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'; // подключение закрылось
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

export const GET_ORDER = 'GET_ORDER';
export const SET_ORDER_INFO = 'SET_ORDER_INFO';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

// генератор экшена для подключения к ws
export const connect = (wsUrl) => {
  return {
    type: WS_CONNECT,
    payload: wsUrl
  }
}

// генератор экшена для прекращения соединения с ws
export const disconnect = () => ({ type: WS_DISCONNECT })

// генератор экшена получения информации о заказе
export function requestOrderInfo(number) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    });
    getOrderInfo(number).then(res => {
      dispatch({
        type: SET_ORDER_INFO,
        payload: res.orders[0]
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ORDER_FAILED
      })
      console.log(err)
    })
  }
}
