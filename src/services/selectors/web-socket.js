export const getWSocketData = (store) => store.socket;
export const getWsError = (store) => store.socket.error;
export const getOrder = (store) => store.socket.openedOrder;
export const getisOrderLoading = (store) => store.socket.isLoading;

export const getOrdersInfo = (store) => store.socket.orders;
export const getOrderList = (store) => store.socket.orders.orders;
export const getTotal = (store) => store.socket.orders.total;
export const getTotalToday = (store) => store.socket.orders.totalToday;
