import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./order-details.module.css";
import { getOrderList, getWsError } from "../../../services/selectors/web-socket";
import ModalLoader from "../../modal/modal-loader/modal-loader";
import OrderComposition from "./order-composition/order-composition";
import DetailsFooter from "./details-footer/details-footer";


function OrderDetails() {
  const { number } = useParams();
  const orders = useSelector(getOrderList);
  const error = useSelector(getWsError);

  if (!orders) { return <ModalLoader /> }
  if (error) { return <ModalLoader hasError={true} /> }


  // находим заказ, совпадающий по номеру с номером из url (= открытый)
  const detailsOrder = orders.find(item => item.number == number)

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

  return (
    <article className={styles.details}>
      <h3 className={styles.name}>{detailsOrder.name}</h3>
      <p className={statusClasses}>{statusText}</p>

      <OrderComposition ingredientList={detailsOrder.ingredients} />

      <DetailsFooter detailsOrder={detailsOrder} />
    </article>
  )
};

export default OrderDetails;
