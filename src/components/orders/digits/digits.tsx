import React from "react";
import styles from "./digits.module.css";
import { TOrder } from "../../../utils/types";
import NumbersSection from "../numbers-section/numbers-section";
import TotalInfo from "../total-info/total-info";


type Props = {
  orderList: TOrder[];
  total: number;
  totalToday: number;
}

function Digits({ orderList, total, totalToday }: Props) {
  // фильтруем пришедший список на заказы со статусом done и остальные
  const { doneOrders, otherOrders } = React.useMemo(() => {
    const doneOrders: number[] = [];
    const otherOrders: number[] = [];

    orderList.forEach(order => {
      if (order.status === 'done') {
        doneOrders.push(order.number);
      } else {
        otherOrders.push(order.number);
      }
    });

    return { doneOrders, otherOrders };
  }, [orderList]);


  return (
    <section aria-label="Digits" className={styles.section}>
        <section aria-label="Номера заказов" className={`${styles.numbers} mt-15`}>
          <NumbersSection type="done" orderNumbers={doneOrders} />
          <NumbersSection type="in-work" orderNumbers={otherOrders} />
        </section>

        {total && <TotalInfo text="Выполнено за все время:" extraClass="mb-15">{total}</TotalInfo>}

        {totalToday && <TotalInfo text="Выполнено за сегодня:">{totalToday}</TotalInfo>}
    </section>
  );
}

export default React.memo(Digits);
