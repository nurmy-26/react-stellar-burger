import React from "react";
import styles from "./order-feed.module.css";
import OrderCard from "../order-card/order-card";


// #todo - удалить хардкод
function createMultipleOrders(orderData, quantity) {
  const orders = [];

  for(let i = 0; i < quantity; i++) {
    orders.push({...orderData});
  }

  return orders;
}


function OrderFeed({type}) {

  const orderData = {
    name: 'Death Star Starship Main бургер',
    number: '#' + '034535'
  };
  const quantity = 6;
  const orders = createMultipleOrders(orderData, quantity); // создаем 6 дубликатов заказа


  const MemoOrderCard = React.memo(OrderCard)
  // useMemo в обоих случаях - чтобы не было лишних рендеров
  const section = React.useMemo(() => {
    return orders.map((item, index) => {
      return <MemoOrderCard orderInfo={item} key={index} />;
    })
  }, [orders])


  // #todo проверки isLoading, hasError
  return (
    <ul className={`${styles.list} ${type === 'history' ? styles.historyList : styles.feedList}`}>
      {section}
    </ul>
  );
}

export default OrderFeed;
