import React from "react";
import styles from "./order-details.module.css";
import orderAccepted from "../../../images/order-accepted.svg"
import pentagonA from "../../../images/pentagon-1.svg"
import pentagonB from "../../../images/pentagon-2.svg"
import pentagonC from "../../../images/pentagon-3.svg"
import { useSelector } from "react-redux";
import { getOrderDetails } from "../../../services/selectors/order";
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loading from "../../loading/loading";


function OrderDetails() {
  const orderInfo = useSelector(getOrderDetails);
  let text = "";
  let done = false;
  let error = false;

  if (!orderInfo.isLoading && !orderInfo.hasError) {
    text = "идентификатор заказа";
    done = true;
  } else if (orderInfo.isLoading) {
    text = (<Loading type='loadingPoints'>Отправляем ваш заказ...</Loading>);
  } else {
    text = "Что-то пошло не так :(";
    error = true;
  }

  return (
    <div className={styles.details}>
      <h3 className={styles.number}>{orderInfo.order.number}</h3>
      <p className={styles.order}>
        {text}
      </p>
      <div className={styles.stub}>
        {/* картинка для удачного запроса */}
        {done &&
          <img className={styles.img} src={orderAccepted} alt="галочка" />
        }

        {/* вертушка для загрузки и ошибки */}
        {!done &&
          <>
            <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonA} alt="фоновый вектор" />
            <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonB} alt="фоновый вектор" />
            <img className={`${styles.penta} ${styles.pentaB}`} src={pentagonC} alt="фоновый вектор" />
          </>
        }
      </div>
      <p className={styles.status}>{orderInfo.status}</p>
      <p className={`${styles.status} ${styles.substatus}`}>
        {orderInfo.substatus}

        {/* картинка для ошибки */}
        {error &&
          <>
            <InfoIcon type="secondary" />
            <span>Обратитесь в службу межгалактической поддержки</span>
          </>
        }
      </p>
    </div>
  );
};

export default OrderDetails;
