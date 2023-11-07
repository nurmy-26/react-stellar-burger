import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorSection from "./constructor-section/constructor-section";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { useModal } from "../../hooks/useModal"; // импорт кастомного хука
import { useDispatch, useSelector } from "react-redux";
import { getConstructorData } from "../../services/selectors/burger-constructor";
import { getOrderDetails } from "../../services/selectors/order";
import { requestOrder, resetOrder } from "../../services/actions/order";
import BunContainer from "./bun-container/bun-container";


function BurgerConstructor() {
  const constructorData = useSelector(getConstructorData);
  const orderInfo = useSelector(getOrderDetails);
  const dispatch = useDispatch();

  // деструктуризуем кастомный хук для управления модальным окном
  const { isModalOpen, openModal, closeModal } = useModal();

  // ф-я, отправляющая запрос с заказом на сервер
  const sendOrder = () => {
    const bunId = constructorData.bun._id;
    const ingredientsArr = constructorData.ingredients.map(item => item._id)
    const constructorIdList = [bunId, ...ingredientsArr, bunId]

    dispatch(requestOrder(constructorIdList));
  }

  // ф-я, закрывающая модальное окно и сбрасывающая инфо заказа
  const closeOrderModal = () => {
    closeModal();
    dispatch(resetOrder())
  }

  // мемоизация компонентов верхней и нижней булок (для остановки ререндера нужно вызывать именно здесь)
  const MemoBunContainer = React.memo(BunContainer);

  return (
    <section aria-label="Ингредиенты" className={styles.section}>

      <MemoBunContainer type="top" />

      <ConstructorSection />

      <MemoBunContainer type="bottom" />

      <ConstructorTotal onOpen={sendOrder}>{constructorData.totalPrice}</ConstructorTotal>

      {
        !isModalOpen && orderInfo.success &&
        <Modal header="" onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
