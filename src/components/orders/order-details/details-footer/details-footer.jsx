import React from "react";
import { useSelector } from "react-redux";
import styles from "./details-footer.module.css";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderPropType } from "../../../../utils/prop-types";
import { calculateTotalCost } from "../../../../utils/helpers";
import { getIngredientsList } from "../../../../services/selectors/ingredients";
import PriceCount from "../../../common/price-count/price-count";


function DetailsFooter({detailsOrder}) {
  const ingredientList = useSelector(getIngredientsList);

  // высчитываем стоимость заказа
  const totalCost = React.useMemo(() =>
    calculateTotalCost(detailsOrder.ingredients, ingredientList),
  [detailsOrder.ingredients, ingredientList]);

  const MemoFormattedDate = React.memo(FormattedDate);


  return (
    <footer className={styles.footer}>
      <span className="text text_type_main-default text_color_inactive">
          <MemoFormattedDate date={new Date(detailsOrder.createdAt)} />
          &nbsp;i-GMT+3
      </span>

      <PriceCount>{totalCost}</PriceCount>
    </footer>
 )
};

DetailsFooter.propTypes = {
  detailsOrder: orderPropType
}

export default DetailsFooter;
