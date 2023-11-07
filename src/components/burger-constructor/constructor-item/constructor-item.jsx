import React from "react";
import { useDispatch } from "react-redux";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";
import { deleteIngredient } from "../../../services/actions/burger-constructor";


// на вход - объект из data
function ConstructorItem({item}) {
  const {name, price, image} = item;
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteIngredient(item));
  }

  return (
    <li className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={image} handleClose={() => handleDelete(item)} />
    </li>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropType
}

export default React.memo(ConstructorItem);
