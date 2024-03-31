import React from "react";
import styles from "./order-feed.module.css";
import { TOrder } from "../../../utils/types";
import OrderCard from "../order-card/order-card";


type Props = {
  type?: string;
  orderList: TOrder[];
}

function OrderFeed({ type, orderList }: Props) {
  const MemoOrderCard = React.memo(OrderCard);
  const section = React.useMemo(() => {
    return orderList.map((item) => {
      return <MemoOrderCard orderInfo={item} key={item._id} type={type === 'history' ? 'history' : ''} />;
    })
  }, [orderList])


  return (
    <ul className={`${styles.list} ${type === 'history' ? styles.historyList : styles.feedList}`}>
      {section}
    </ul>
  );
}

export default OrderFeed;
