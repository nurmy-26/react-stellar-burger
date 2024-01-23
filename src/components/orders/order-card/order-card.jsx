import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./order-card.module.css";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderPropType } from "../../../utils/prop-types";
import { calculateTotalCost } from "../../../utils/helpers";
import { getIngredientsList } from "../../../services/selectors/ingredients";
import PriceCount from "../../common/price-count/price-count";
import ImagesRow from "../order-ingredients/images-row/images-row";


function OrderCard({orderInfo, type='feed'}) {
  let location = useLocation();
  const ingredientList = useSelector(getIngredientsList);

  const {createdAt, ingredients, name, number, status} = orderInfo;

  let statusText;
  let statusClasses = "text text_type_main-default mt-2"
  switch(status) {
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    case "done":
      statusText = "Выполнен";
      statusClasses += " " + styles.statusDone
      break;
  }

  // высчитываем стоимость заказа
  const totalCost = React.useMemo(() =>
    calculateTotalCost(ingredients, ingredientList),
  [ingredients, ingredientList]);

  const MemoFormattedDate = React.memo(FormattedDate);
  const MemoImagesRow = React.memo(ImagesRow);


  return (
      <li className={styles.card}>
        <Link className={styles.link} to={`${location.pathname}/${number}`} state={{ background: location }}>
          <div className={styles.row}>
            <p className="text text_type_digits-default">#{number}</p>
            <span className="text text_type_main-default text_color_inactive">
              <MemoFormattedDate date={new Date(createdAt)} />
              &nbsp;i-GMT+3
            </span>
          </div>

          <div>
            <h2 className="text text_type_main-medium">{name}</h2>
            {type === 'history' && <p className={statusClasses}>{statusText}</p>}
          </div>


          <div className={styles.row}>
            <MemoImagesRow idList={ingredients} />

            <PriceCount>{totalCost}</PriceCount>
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

