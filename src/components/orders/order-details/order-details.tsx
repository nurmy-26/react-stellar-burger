import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../../hooks/redux-hooks";
import styles from "./order-details.module.css";
import { getOrderList, getWsError, getisOrderLoading } from "../../../services/selectors/web-socket";
import ModalLoader from "../../modal/modal-loader/modal-loader";
import OrderComposition from "./order-composition/order-composition";
import DetailsFooter from "./details-footer/details-footer";
import { TOrder } from "../../../utils/types";


type Props = {
  orderByRequest?: TOrder;
}

function OrderDetails({ orderByRequest }: Props) {
  const { number } = useParams();
  const orders = useSelector(getOrderList);
  const error = useSelector(getWsError);
  const isLoading = useSelector(getisOrderLoading);

  let detailsOrder;

  // если orders нет, значит открыта отдельная страница, а не модалка с веб-сокетом, и значит передан пропс
  if (!orders) {
    detailsOrder = orderByRequest;
  } else {
    detailsOrder = orders.find(item => item.number.toString() === number);
  }
  if (!detailsOrder) {
    return <ModalLoader />
  }

  let statusText;
  let statusClasses = "mb-2 text text_type_main-default"
  switch(detailsOrder.status) {
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    case "done":
      statusText = "Выполнен";
      statusClasses += " " + styles.statusDone
      break;
  }

  const MemoOrderComposition = React.memo(OrderComposition);
  const MemoDetailsFooter = React.memo(DetailsFooter);

  return (
    <>
      {isLoading && <ModalLoader />}
      {error && <ModalLoader hasError={true} />}
      {(orders || orderByRequest) && !isLoading && !error && (

        <article className={styles.details}>
          <h3 className={styles.name}>{detailsOrder.name}</h3>
          <p className={statusClasses}>{statusText}</p>

          <MemoOrderComposition ingredientList={detailsOrder.ingredients} />

          <MemoDetailsFooter detailsOrder={detailsOrder} />
        </article>
      )}
    </>
  )
};

export default OrderDetails;
