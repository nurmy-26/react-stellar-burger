import { updateToken, config } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
let token = getCookie('token');

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null; // инициализируем store

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      // записываем в поля нужные нам экшены из переданного объекта wsActions
      const { wsConnect, wsDisconnect, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;

      // если задиспатчили connect - создаем ws-соединение
      if (type === wsConnect) {

        // если переданный url - WS_ALL, то обычный сокет
        if (payload === config.WS_ALL) {
          socket = new WebSocket(payload);
          // если переданный url - WS_AUTH, то сокет для авторизованных пользователей
        } else if (payload === config.WS_AUTH && token) {
          // const token = getCookie('token');
          socket = new WebSocket(`${payload}?token=${token}`);
        } else if (payload === config.WS_AUTH && !token) {
          updateToken()
          token = getCookie('token');
          socket = new WebSocket(`${payload}?token=${token}`);
        }

        dispatch({ type: wsConnecting });

        // подписываемся на события сокета
        socket.onopen = () => {
          dispatch({ type: onOpen });
        }

        socket.onerror = () => {
          dispatch({ type: onError, payload: 'Error' });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (data.message === 'Invalid or missing token') {
            updateToken()
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        }
      }

      if (type === wsDisconnect && socket) {
        socket.close();
        socket = null;
      }

      // передаем экшн дальше следующему мидлвару или редьюсеру
      next(action);
    };
  };
};
