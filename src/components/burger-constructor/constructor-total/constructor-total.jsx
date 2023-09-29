import React from "react";
import styles from "./constructor-total.module.css";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

// на вход data
function ConstructorTotal(props) {

  return (
    <div className={styles.wrapper}>
      <span className={styles.total}>
        {props.children}
        {/* в библиотеке нет большой иконки валюты */}
        <CurrencyIcon type="primary" />
      </span>

      <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>

  );
};

export default ConstructorTotal;
