import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./order-card.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderPropType } from "../../../utils/prop-types";
import { getIngredientsList } from "../../../services/selectors/ingredients";
import IngredientsRow from "../ingredients-row/ingredients-row";


function OrderCard({orderInfo, type='feed'}) {
  let location = useLocation();
  const ingredientList = useSelector(getIngredientsList);

  const {createdAt, ingredients, name, number, status} = orderInfo;

  let statusText;
  switch(status) {
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    case "done":
      statusText = "Выполнен";
      break;
  }

  // высчитываем стоимость заказа
  const calculateOrderCost = React.useCallback(() => {
    let totalCost = 0;

    // для каждого id в заказе ищем нужный ингредиент в общем списке ингредиентов
    ingredients.forEach((id) => {
      const ingredient = ingredientList.find((ingredient) => ingredient._id === id);

      // если нашли, прибавляем его стоимость к общей
      if (ingredient) {
        totalCost += ingredient.price;
      }
    });

    return totalCost;
  }, [ingredientList, ingredients]);


  const MemoCurrencyIcon = React.memo(CurrencyIcon);

  // #todo - доделать модалку
  return (
      <li className={styles.card}>
        <Link className={styles.link} to={`${location.pathname}/${number}`} state={{ background: location }}>
          <div className={styles.row}>
            <p className="text text_type_digits-default">#{number}</p>
            <span className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(createdAt)} />
              &nbsp;i-GMT+3
            </span>
          </div>

          <div>
            <h2 className="text text_type_main-medium">{name}</h2>
            {type === 'history' && <p className="text text_type_main-default mt-2">{status}</p>}
          </div>


          <div className={styles.row}>
            <IngredientsRow idList={ingredients} />

            <span className={styles.total}>
              {calculateOrderCost()}
              <MemoCurrencyIcon type="primary" />
            </span>
          </div>

        </Link>
      </li>
  );
}

OrderCard.propTypes = {
  type: PropTypes.string,
  orderInfo: orderPropType.isRequired
}


export default OrderCard;

