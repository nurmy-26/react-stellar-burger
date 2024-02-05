import React from "react";
import { useDispatch, useSelector } from "../../../../hooks/redux-hooks";
import { useParams } from "react-router-dom";
import styles from "./order-details-wrapper.module.css";
import { requestOrderInfo } from "../../../../services/slices/socket";
import { getOrder } from "../../../../services/selectors/web-socket";
import OrderDetails from "../order-details";


const OrderDetailsWrapper = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const orderNumber = Number(number);
  // при открытии отдельной страницы (а не модалки) получаем инфо о заказе через запрос к серверу
  React.useEffect(() => {
    dispatch(requestOrderInfo(orderNumber));
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
