import React from "react";
import styles from "./order-details.module.css";
import orderAccepted from "../../../images/order-accepted.svg"


function OrderDetails(props) {
  const {number, status, substatus} = props;
  return (
    <div className={styles.details}>
      <h3 className={styles.number}>{number}</h3>
      <p className={styles.order}>идентификатор заказа</p>
      <img className={styles.img} src={orderAccepted} alt="галочка" />
      <p className={styles.status}>{status}</p>
      <p className={`${styles.status} ${styles.substatus}`}>{substatus}</p>
    </div>
  );
};

export default OrderDetails;
