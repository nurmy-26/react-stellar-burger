import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";


function IngredientCard({itemInfo, onOpen}) {
  const {name, price, image} = itemInfo;
  return (
    <li className={styles.card} onClick={onOpen}>
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

IngredientCard.propTypes = {
  itemInfo: ingredientPropType,
  onOpen: PropTypes.func.isRequired
}


export default IngredientCard;

