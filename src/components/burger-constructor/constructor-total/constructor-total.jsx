import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-total.module.css";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';


// на вход data
function ConstructorTotal({children, onOpen}) {
  // мемоизация компонентов из библиотеки
  const MemoCurrencyIcon = React.memo(CurrencyIcon);
  const MemoButton = React.memo(Button);

  return (
    <div className={styles.wrapper}>
      <span className={styles.total}>
        {children}
        <MemoCurrencyIcon type="primary" />
      </span>

      <MemoButton onClick={onOpen} htmlType="button" type="primary" size="large">Оформить заказ</MemoButton>
    </div>
  );
};

ConstructorTotal.propTypes = {
  children: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired
  }

export default React.memo(ConstructorTotal);
