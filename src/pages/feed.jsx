import React from "react";
import styles from "./page.module.css";
import Loading from "../components/common/loading/loading";
import MainContainer from "../components/common/main-container/main-container";
import OrderFeed from "../components/orders/order-feed/order-feed";
import Digits from "../components/orders/digits/digits";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../services/actions/web-socket";
import { config } from "../utils/api";
import { getOrderList, getTotal, getTotalToday } from "../services/selectors/web-socket";


function FeedPage() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrderList);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  React.useEffect(() => {
    dispatch(connect(config.WS_ALL))

    return () => { dispatch(disconnect()) };
  }, []);

  // #todo - ПОМЕНЯТЬ Loader (на полупрозрачное стекло с точками по центру)
  if (!orders) {
    return <Loading />
  }
  const MemoOrderFeed = React.memo(OrderFeed);


  return (
    // #todo - добавить Loader и условия
    <MainContainer extraClass={styles.marginMedium}>

      <section>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <MemoOrderFeed type="feed" orderList={orders} />
      </section>

      <Digits orderList={orders} total={total} totalToday={totalToday} />

    </MainContainer>
  );
}

export default FeedPage;
