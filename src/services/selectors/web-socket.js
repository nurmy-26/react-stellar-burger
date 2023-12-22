export const getWSocketData = (store) => store.socket;
export const getOrdersInfo = (store) => store.socket.orders;
export const getOrderList = (store) => store.socket.orders.orders;
export const getTotal = (store) => store.socket.orders.total;
export const getTotalToday = (store) => store.socket.orders.totalToday;
