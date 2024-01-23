import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ingredients-row.module.css";
import { findItem } from "../../../../utils/helpers";
import { getIngredientsList } from "../../../../services/selectors/ingredients";
import PriceCount from "../../../common/price-count/price-count";
import IngredientCircle from "../ingredient-circle/ingredient-circle";


function IngredientsRow({ id, count }) {
  const MemoImgCircle = React.memo(IngredientCircle)
  const ingredientList = useSelector(getIngredientsList);

  // находим ингредиент, совпадающий по id с id из url (= открытый)
  const ingredient = React.useMemo(() =>
    findItem(ingredientList, id),
  [ingredientList]);

  if (!ingredient) {
    return null
  }

  return (
    <li className={styles.row}>
      <MemoImgCircle itemId={id} />

      <h5 className="text text_type_main-default">{ingredient.name}</h5>

      <PriceCount>{`${count} x ${ingredient.price}`}</PriceCount>
    </li>
  );
}

IngredientsRow.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

export default IngredientsRow;
