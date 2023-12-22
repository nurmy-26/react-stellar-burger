import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/common/main-container/main-container";
// import Loading from "../components/common/loading/loading";
import OrderFeed from "../components/orders/order-feed/order-feed";
import NumbersSection from "../components/orders/numbers-section/numbers-section";
import TotalInfo from "../components/orders/total-info/total-info";


function FeedPage() {
  // const ingredientsData = useSelector(getIngredientsData);

  return (
    // #todo - добавить Loader и условия
    // #todo - убрать хардкод
    <MainContainer extraClass={styles.marginMedium}>

      <div>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <OrderFeed type="feed" />
      </div>

      <div>
        <div className={`${styles.twoColumns} mt-15`}>
          <NumbersSection type="done" />
          <NumbersSection type="in-work" />
        </div>

        <TotalInfo text="Выполнено за все время:" extraClass="mb-15">28 752</TotalInfo>

        <TotalInfo text="Выполнено за сегодня:">138</TotalInfo>
      </div>

    </MainContainer>
  );
}

export default FeedPage;
