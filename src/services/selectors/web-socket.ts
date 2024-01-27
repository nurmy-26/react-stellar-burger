import { RootState } from "../../utils/types";

export const getWSocketData = (store: RootState) => store.socket;
export const getWsError = (store: RootState) => store.socket.error;
export const getOrder = (store: RootState) => store.socket.openedOrder;
export const getisOrderLoading = (store: RootState) => store.socket.isLoading;

export const getOrdersInfo = (store: RootState) => store.socket.orders;
export const getOrderList = (store: RootState) => store.socket.orders?.orders || null;
export const getTotal = (store: RootState) => store.socket.orders?.total || 0;
export const getTotalToday = (store: RootState) => store.socket.orders?.totalToday || 0;
