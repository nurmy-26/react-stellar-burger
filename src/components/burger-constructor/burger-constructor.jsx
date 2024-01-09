import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import { useModal } from "../../hooks/useModal";
import { getConstructorData } from "../../services/selectors/burger-constructor";
import { requestOrder, resetOrder } from "../../services/actions/order";
import { clearOrder } from "../../services/actions/burger-constructor";
import { getUser } from "../../services/selectors/auth";
import Modal from "../modal/modal";
import ConstructorSection from "./constructor-section/constructor-section";
import ConstructorTotal from "./constructor-total/constructor-total";
import OrderNumber from "./order-number/order-number";
import BunContainer from "./bun-container/bun-container";


function BurgerConstructor() {
  const constructorData = useSelector(getConstructorData);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // деструктуризуем кастомный хук для управления модальным окном
  const { isModalOpen, openModal, closeModal } = useModal();

  // ф-я, отправляющая запрос с заказом на сервер
  const sendOrder = () => {
    // если пользователь не авторизован, он не сможет отправить заказ (перекинет на роут /login )
    if (!user) {
      navigate("/login");
      return;
    }

    const bunId = constructorData.bun._id;
    const ingredientsArr = constructorData.ingredients.map(item => item._id)
    const constructorIdList = [bunId, ...ingredientsArr, bunId]

    dispatch(requestOrder(constructorIdList));
    openModal();
  }

  // ф-я, закрывающая модальное окно и сбрасывающая инфо заказа
  const closeOrderModal = () => {
    dispatch(clearOrder()); // возвращаем конструктор в исходное состояние
    closeModal();
    dispatch(resetOrder()); // очищаем информацию в модальном окне
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
        isModalOpen &&
        <Modal header="" onClose={closeOrderModal}>
          <OrderNumber />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
