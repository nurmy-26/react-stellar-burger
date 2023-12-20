import React from "react";
import { useSelector } from "react-redux";
import styles from "./order-details.module.css";
import { getOrderDetails } from "../../../services/selectors/order";
import orderAccepted from "../../../images/order-accepted.svg"
import ModalLoader from "../../modal/modal-loader/modal-loader";


function OrderDetails() {
  const orderInfo = useSelector(getOrderDetails);

  return (
    <>
      {orderInfo.isLoading && <ModalLoader size="m" loadingText="Отправляем ваш заказ..." />}
      {orderInfo.hasError && <ModalLoader size="m" hasError={true} />}
      {orderInfo && !orderInfo.isLoading && !orderInfo.hasError && (
        <div className={styles.details}>
          <h3 className={styles.number}>{orderInfo.order.number}</h3>
          <p className={styles.order}>идентификатор заказа</p>
          <div className={styles.stub}>
            <img className={styles.img} src={orderAccepted} alt="галочка" />
          </div>
          <p className={styles.status}>{orderInfo.status}</p>
          <p className={`${styles.status} ${styles.substatus}`}>
            {orderInfo.substatus}
          </p>
        </div>
      )}
    </>
  )
};

export default OrderDetails;
