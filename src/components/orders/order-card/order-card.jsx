import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./order-card.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
// import {ingredientPropType} from "../../../utils/prop-types";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import IngredientsRow from "../ingredients-row/ingredients-row";


function OrderCard({orderInfo}) {
  let location = useLocation();

  const {name, number} = orderInfo;

  // #todo - удалить хардкод
  const dateFromServer = '2022-10-10T17:33:32.877Z'
  const status = "Создан";
  const total = "480";
  const imgIdList = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0944', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa094a', '643d69a5c3f7b9001cfa0949', '643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa094a', '643d69a5c3f7b9001cfa093f', '643d69a5c3f7b9001cfa093d']


  const MemoCurrencyIcon = React.memo(CurrencyIcon);

  // #todo - доделать модалку
  return (
      <li className={styles.card}>
        <Link className={styles.link} to={`${location.pathname}/${number}`} state={{ background: location }}>
          <div className={styles.row}>
            <p className="text text_type_digits-default">{number}</p>
            <span className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(dateFromServer)} />
              &nbsp;i-GMT+3
            </span>
          </div>

          <div>
            <h2 className="text text_type_main-medium">{name}</h2>
            {/* {status && <p className="text text_type_main-default mt-2">{status}</p>} */}
          </div>


          <div className={styles.row}>
            <IngredientsRow idList={imgIdList} />

            <span className={styles.total}>
              {total}
              <MemoCurrencyIcon type="primary" />
            </span>
          </div>

        </Link>
      </li>
  );
}

OrderCard.propTypes = {
  // #todo - дописать пропсы
  // orderInfo: ingredientPropType
}


export default OrderCard;

