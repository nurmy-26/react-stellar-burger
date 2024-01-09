import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile-history.module.css";
import { config } from "../../utils/api";
import { connect, disconnect } from "../../services/actions/web-socket";
import { getOrderList } from "../../services/selectors/web-socket";
import OrderFeed from "../orders/order-feed/order-feed";
import Loading from "../common/loading/loading";


function ProfileHistory() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrderList)?.slice().reverse();

  React.useEffect(() => {
    dispatch(connect(config.WS_AUTH))

    return () => { dispatch(disconnect()) };
  }, []);

  if (!orders) {
    return <Loading />
  }

  // const MemoOrderFeed = React.memo(OrderFeed);

  return (
    <section aria-label="Лента заказов пользователя">
      <OrderFeed type="history" orderList={orders} />
    </section>
  );
}

export default React.memo(ProfileHistory);
