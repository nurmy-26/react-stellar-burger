import React from "react";
import { useSelector } from "../../../hooks/redux-hooks";
import styles from "./order-number.module.css";
import { getOrderData } from "../../../services/selectors/order";
import orderAccepted from "../../../images/order-accepted.svg"
import ModalLoader from "../../modal/modal-loader/modal-loader";
import { cookingPhrases } from "../../../utils/data";
import { randomPhrase } from "../../../utils/helpers";


function OrderNumber() {
  const orderInfo = useSelector(getOrderData);

  const randomText = React.useMemo(() => {
    return randomPhrase(cookingPhrases);
  }, [cookingPhrases]);

  return (
    <>
      {orderInfo.isLoading && <ModalLoader size="m" loadingText={randomText} type='sendOrder' />}
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

export default OrderNumber;
