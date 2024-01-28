import React from "react";
import { useSelector } from "../../../../hooks/redux-hooks";
import styles from "./details-footer.module.css";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from "../../../../utils/types";
import { calculateTotalCost } from "../../../../utils/helpers";
import { getIngredientsList } from "../../../../services/selectors/ingredients";
import PriceCount from "../../../common/price-count/price-count";


type Props = {
  detailsOrder: TOrder;
}

function DetailsFooter({ detailsOrder }: Props) {
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

export default DetailsFooter;
