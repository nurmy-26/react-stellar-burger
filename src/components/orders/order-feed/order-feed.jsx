import React from "react";
import PropTypes from "prop-types";
import styles from "./order-feed.module.css";
import { orderPropType } from "../../../utils/prop-types";
import OrderCard from "../order-card/order-card";


function OrderFeed({type, orderList}) {
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

OrderFeed.propTypes = {
  type: PropTypes.string,
  orderList: PropTypes.arrayOf(orderPropType)
}

export default OrderFeed;
