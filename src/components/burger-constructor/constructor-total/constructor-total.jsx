import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./constructor-total.module.css";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getConstructorData } from "../../../services/selectors/burger-constructor";


// на вход data
function ConstructorTotal({children, onOpen}) {
  const constructorData = useSelector(getConstructorData);
  // мемоизация компонентов из библиотеки
  const MemoCurrencyIcon = React.memo(CurrencyIcon);
  const MemoButton = React.memo(Button);

  return (
    <div className={styles.wrapper}>
      <span className={styles.total}>
        {children}
        <MemoCurrencyIcon type="primary" />
      </span>

      <MemoButton onClick={onOpen} disabled={constructorData["bun"] === null} htmlType="button" type="primary" size="large">Оформить заказ</MemoButton>
    </div>
  );
};

ConstructorTotal.propTypes = {
  children: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired
  }

export default React.memo(ConstructorTotal);
