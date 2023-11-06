import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";


function IngredientCard({itemInfo, onOpen}) {
  const {name, type, price, image} = itemInfo;
  const [, draggableIngredientRef, previewRef ] = useDrag({
    type: type,
    item: itemInfo
  });

  return (
    <li ref={draggableIngredientRef} className={styles.card} onClick={onOpen}>
      <Counter className={styles.counter} count={0} size="default" extraClass="m-1" />
      <img ref={previewRef} className={styles.img} src={image} alt={name} />
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

