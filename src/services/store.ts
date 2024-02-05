import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/web-socket';
import authReducer from './slices/auth';
import constructorReducer from './slices/burger-constructor';
import ingredientsReducer from './slices/ingredients';
import orderReducer from './slices/order';
import socketReducer, {
  connect,
  disconnect,
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage } from './slices/socket';

const wsActions = {
  wsConnect: connect.type,
  wsDisconnect: disconnect.type,
  wsConnecting: wsConnectionStart.type,
  onOpen: wsConnectionSuccess.type,
  onClose: wsConnectionClosed.type,
  onError: wsConnectionError.type,
  onMessage: wsGetMessage.type
}

// инициализируем хранилище
export const store = configureStore({
  reducer: {
    ingredientsData: ingredientsReducer,
    constructorData: constructorReducer,
    orderData: orderReducer,
    auth: authReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
  // Redux DevTools инструменты будут установлены автоматически
});

export default store;
