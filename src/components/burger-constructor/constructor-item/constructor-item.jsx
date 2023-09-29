import React from "react";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

// на вход - ...
function ConstructorItem({item, type}) {
  const {name, price, image} = item;

  // технически, значение должно откуда-то браться, но пока его неоткуда брать (отсутствует в data) - будет рандомным
  const randomizeBool = () => {
    return Math.random() < 0.5;
  }

  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement type={type} isLocked={randomizeBool()} text={name} price={price} thumbnail={image} />
    </li>
  );
};

export default ConstructorItem;
