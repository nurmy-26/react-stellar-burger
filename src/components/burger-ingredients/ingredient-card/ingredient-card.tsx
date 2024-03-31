import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "../../../hooks/redux-hooks";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingredient-card.module.css";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../../utils/types";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import PriceCount from "../../common/price-count/price-count";


type Props = {
  itemInfo: TIngredient;
}

function IngredientCard({ itemInfo }: Props) {
  let location = useLocation();

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

  return (
    <li ref={draggableIngredientRef}>
      <Link className={`${styles.link} ${styles.card}`} to={`/ingredients/${_id}`} state={{ background: location }}>
        { // счетчик ингредиента отобразится только если он больше 0
          amount > 0 &&
          // (<MemoCounter className={styles.counter} count={amount} size="default" extraClass="m-1" />)
          (<MemoCounter count={amount} size="default" extraClass={`${styles.counter} m-1`} />)
        }
        <img ref={previewRef} className={styles.img} src={image} alt={name} />

        <PriceCount>{price}</PriceCount>

        <h3 className={styles.title}>{name}</h3>
      </Link>
    </li>
  );
}

export default IngredientCard;

