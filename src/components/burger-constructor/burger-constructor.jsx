import React from "react";
// import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import ConstructorSection from "./constructor-section/constructor-section";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientPropType } from "../../utils/prop-types";
import { useModal } from "../../hooks/useModal"; // импорт кастомного хука
import { ConstructorContext, OrderContext } from "../../services/orderContext";
import { postOrder } from "../../utils/api";


function BurgerConstructor() {
  // достаем из контекста деструктуризуемые данные
  const {constructorState} = React.useContext(ConstructorContext);

  // деструктуризуем кастомный хук для управления модальным окном
  const { isModalOpen, openModal, closeModal } = useModal();

  // начальное состояние заказа
  const [orderInfo, setOrderInfo] = React.useState({
    // name и number будут массивами, если нужно будет сохранять все сделанные заказы (?)
    name: '',
    order: {
      number: null
    },
    success: false,
    status: 'Ваш заказ начали готовить',
    substatus: 'Дождитесь готовности на орбитальной станции'
  });

  // ф-я, возвращающая массив из id для заказа (берет id из текущего контекста)
  const getOrderArr = () => {
    const bunId = constructorState.bun._id;
    const ingredientsArr = constructorState.ingredients.map(item => item._id)
    return [bunId, ...ingredientsArr, bunId]
  }

  // ф-я, отправляющая запрос с заказом на сервер и обрабатывающая ответ (перезаписывает OrderInfo, открывает модальное окно)
  const sendOrder = (arr) => {
    // arr - массив id которые надо отправить (получаем из ф-и getOrderArr)
    postOrder(arr)
      .then(answer => {
        // в случае успешного запроса перезаписываем OrderInfo
        setOrderInfo({
          ...orderInfo,
          name: answer.name,
          order: {
            ...orderInfo.order,
            number: answer.order.number
          },
          success: answer.success,
        })
        // и открываем модальное окно
        openModal();
      })
      .catch(err => {
        setOrderInfo({
        ...orderInfo,
        success: false
      });
        console.error(err);
      })
  }

  return (
    <section aria-label="Ингредиенты" className={styles.section}>
      <div className={styles.item}>
        <ConstructorElement type="top" isLocked={true} text={`${constructorState.bun.name} (верх)`} price={constructorState.bun.price} thumbnail={constructorState.bun.image} />
      </div>
      <ConstructorSection />
      <div className={styles.item}>
        <ConstructorElement type="bottom" isLocked={true} text={`${constructorState.bun.name} (низ)`} price={constructorState.bun.price} thumbnail={constructorState.bun.image} />
      </div>

      <ConstructorTotal onOpen={() => sendOrder(getOrderArr())}>{constructorState.total}</ConstructorTotal>

      {/* // возможно, стоит сделать 3 варианта вместо двух: открыто / идет загрузка / закрыто */}
      {
        isModalOpen && orderInfo.success &&
        <Modal header="" onClose={closeModal}>
          <OrderContext.Provider value={{orderInfo}}>
            <OrderDetails />
          </OrderContext.Provider>
        </Modal>
      }
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType).isRequired
// }


export default BurgerConstructor;
