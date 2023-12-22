import { updateToken } from "../../utils/api";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null; // инициализируем store

    return next => action => {
      const { dispatch } = store;
      const { type } = action;

      // записываем в поля нужные нам экшены из переданного объекта wsActions
      const { wsConnect, wsDisconnect, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;

      // если задиспатчили connect - создаем ws-соединение
      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });

        // подписываемся на события сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
          console.log(event)
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
            console.log(parsedData)
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
          console.log(event)
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
