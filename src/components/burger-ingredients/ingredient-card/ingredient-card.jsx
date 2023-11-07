import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";
import { getConstructorData } from "../../../services/selectors/burger-constructor";


function IngredientCard({itemInfo, onOpen}) {
  const {name, type, price, image, _id} = itemInfo;
  const constructorData = useSelector(getConstructorData);
  const [, draggableIngredientRef, previewRef ] = useDrag({
    type: type,
    item: itemInfo,
  });

  const amount = React.useMemo(() => {
    if (type === 'bun' && constructorData["bun"] !== null) {
      return constructorData["bun"]._id === _id ? 2 : 0
    } else {
      const filteredItems = constructorData["ingredients"].filter(item => item._id === _id)
      return filteredItems.length
    }
  }, [constructorData])

  // мемоизируем компоненты библиотеки для предотвращения частого ререндера
  const MemoCounter = React.memo(Counter)
  const MemoCurrencyIcon = React.memo(CurrencyIcon)

  return (
    <li ref={draggableIngredientRef} className={styles.card} onClick={onOpen}>
      { // счетчик ингредиента отобразится только если он больше 0
        amount > 0 &&
        (<MemoCounter className={styles.counter} count={amount} size="default" extraClass="m-1" />)
      }
      <img ref={previewRef} className={styles.img} src={image} alt={name} />
      <p className={styles.price}>
        {price}
        <MemoCurrencyIcon type="primary" />
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

