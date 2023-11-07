import React from "react";
import styles from "./order-details.module.css";
import orderAccepted from "../../../images/order-accepted.svg"
import { useSelector } from "react-redux";
import { getOrderDetails } from "../../../services/selectors/order";
import Loading from "../../loading/loading";


function OrderDetails() {
  const orderInfo = useSelector(getOrderDetails);

  return (
    orderInfo.success ?
    (
      <div className={styles.details}>
        <h3 className={styles.number}>{orderInfo.order.number}</h3>
        <p className={styles.order}>идентификатор заказа</p>
        <img className={styles.img} src={orderAccepted} alt="галочка" />
        <p className={styles.status}>{orderInfo.status}</p>
        <p className={`${styles.status} ${styles.substatus}`}>{orderInfo.substatus}</p>
      </div>
    ) : (
      <Loading>Отправляем ваш заказ...</Loading>
    )

  );
};

export default OrderDetails;
