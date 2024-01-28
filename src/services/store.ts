import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/web-socket';
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from './actions/web-socket';

const wsActions = {
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  wsConnecting: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

// инициализируем хранилище
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
  // Redux DevTools инструменты будут установлены автоматически
});

export default store;
