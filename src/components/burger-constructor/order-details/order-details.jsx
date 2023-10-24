import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import orderAccepted from "../../../images/order-accepted.svg"
import { OrderContext } from "../../../services/orderContext";


function OrderDetails() {
  // достаем из контекста деструктуризуемые данные
  const {orderInfo} = React.useContext(OrderContext);

  return (
    <div className={styles.details}>
      <h3 className={styles.number}>{orderInfo.order.number}</h3>
      <p className={styles.order}>идентификатор заказа</p>
      <img className={styles.img} src={orderAccepted} alt="галочка" />
      <p className={styles.status}>{orderInfo.status}</p>
      <p className={`${styles.status} ${styles.substatus}`}>{orderInfo.substatus}</p>
    </div>
  );
};

// OrderDetails.propTypes = {
//   number: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
//   substatus: PropTypes.string.isRequired
// }

export default OrderDetails;
