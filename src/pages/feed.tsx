import React from "react";
import { useDispatch, useSelector } from "../hooks/redux-hooks";
import { CONFIG } from "../utils/api";
import { connect, disconnect } from "../services/slices/socket";
import { getOrderList, getTotal, getTotalToday } from "../services/selectors/web-socket";
import MainContainer from "../components/common/main-container/main-container";
import OrderFeed from "../components/orders/order-feed/order-feed";
import Digits from "../components/orders/digits/digits";
import Loading from "../components/common/loading/loading";


function FeedPage() {
  const dispatch = useDispatch();
  const orders = useSelector(getOrderList);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  React.useEffect(() => {
    dispatch(connect(CONFIG.ROUTES.WS_ALL))

    return () => { dispatch(disconnect()) };
  }, []);

  if (!orders) {
    return <Loading />
  }

  // без мемоизации именно внутри компонента OrderFeed продолжает перерисовываться лишние разы
  const MemoOrderFeed = React.memo(OrderFeed);


  return (
    <MainContainer extraClass="ps-m">

      <section>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <MemoOrderFeed type="feed" orderList={orders} />
      </section>

      <Digits orderList={orders} total={total} totalToday={totalToday} />

    </MainContainer>
  );
}

export default FeedPage;
