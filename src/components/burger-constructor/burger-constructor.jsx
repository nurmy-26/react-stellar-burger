import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorSection from "./constructor-section/constructor-section";
import ConstructorTotal from "./constructor-total/constructor-total";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";


function BurgerConstructor(props) {
// фиксированное число - временное решение
// будет подниматься из дочернего ConstructorSection, суммируя стоимость всех выбранных элементов
  const total = 610;
  // const [total, setTotal] = React.useState(0);

  const [visible, setVisible] = React.useState(false);
  function openModal() {
    setVisible(true);
  }
  function closeModal() {
    setVisible(false)
  }

  // временно захардкоженные данные
  const orderInfo = {
    number: '034536',
    status: 'Ваш заказ начали готовить',
    substatus: 'Дождитесь готовности на орбитальной станции'
  }

  return (
    <section aria-label="Ингредиенты" className={styles.section}>
      <div className={styles.item}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
      </div>
      <ConstructorSection data={props.data} />
      <div className={styles.item}>
        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
      </div>

      <ConstructorTotal onOpen={openModal}>{total}</ConstructorTotal>

      {
        visible &&
        <Modal header="" onClose={closeModal}>
          <OrderDetails {...orderInfo} />
        </Modal>
      }

    </section>
  );
}

export default BurgerConstructor;
