// посылаем сами из компонента для подключения/выключения ws (будут приходить в мидлвар)
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNEC';

// диспатчит мидлвар при опр. событиях
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'; // успешно открыли подключение
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'; // подключение закрылось
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

// генератор экшена для подключения к ws
export const connect = (wsUrl) => {
  return {
    type: WS_CONNECT,
    payload: wsUrl
  }
}

// генератор экшена для прекращения соединения с ws
export const disconnect = () => ({ type: WS_DISCONNECT })
