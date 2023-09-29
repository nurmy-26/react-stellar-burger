import React from "react";
import styles from "./ingredient-card.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function IngredientCard({itemInfo}) {
  const {name, price, image} = itemInfo;
  return (
    <li className={styles.card}>
      <Counter className={styles.counter} count={1} size="default" extraClass="m-1" />
      <img className={styles.img} src={image} alt={name} />
      <p className={styles.price}>
        {price}
        <CurrencyIcon type="primary" />
      </p>
      <h3 className={styles.title}>{name}</h3>
    </li>
  );
}

export default IngredientCard;

