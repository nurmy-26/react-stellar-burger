import React from "react";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";


// на вход - объект из data
function ConstructorItem({item}) {
  const {name, price, image} = item;

  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={image} />
    </li>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropType
}

export default React.memo(ConstructorItem);
