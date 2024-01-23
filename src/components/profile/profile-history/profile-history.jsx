import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile-history.module.css";
import { CONFIG } from "../../../utils/api";
import { connect, disconnect } from "../../../services/actions/web-socket";
import { getOrderList } from "../../../services/selectors/web-socket";
import OrderFeed from "../../orders/order-feed/order-feed";
import Loading from "../../common/loading/loading";


function ProfileHistory() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrderList)?.slice().reverse();

  React.useEffect(() => {
    dispatch(connect(CONFIG.ROUTES.WS_AUTH))

    return () => { dispatch(disconnect()) };
  }, []);

  if (!orders) {
    return <Loading />
  }

  const MemoOrderFeed = React.memo(OrderFeed);

  return (
    <section aria-label="Лента заказов пользователя">
      <MemoOrderFeed type="history" orderList={orders} />
    </section>
  );
}

export default ProfileHistory;
