import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-total.module.css";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';


// на вход data
function ConstructorTotal({children, onOpen}) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.total}>
        {children}
        <CurrencyIcon type="primary" />
      </span>

      <Button onClick={onOpen} htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
  );
};

ConstructorTotal.propTypes = {
  children: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired
  }

export default ConstructorTotal;
