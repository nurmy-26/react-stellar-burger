import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./order-details-wrapper.module.css";
import { requestOrderInfo } from "../../../../services/actions/web-socket";
import { getOrder } from "../../../../services/selectors/web-socket";
import OrderDetails from "../order-details";


const OrderDetailsWrapper = () => {
  const { number } = useParams();
  const dispatch = useDispatch()

  // при открытии отдельной страницы (а не модалки) получаем инфо о заказе через запрос к серверу
  React.useEffect(() => {
    dispatch(requestOrderInfo(number));
  }, []);

  // и передаем эту информацию в OrderDetails
  const orderInfo = useSelector(getOrder);
  const MemoOrderDetails = React.memo(OrderDetails);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_digits-default">{"#" + number}</h2>

      <MemoOrderDetails orderByRequest={orderInfo} />
    </div>
  );
};

export default OrderDetailsWrapper;
