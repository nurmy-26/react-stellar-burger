import React from "react";
import PropTypes from "prop-types";
import styles from "./order-composition.module.css";
import { findDuplicates } from "../../../../utils/helpers";
import IngredientsRow from "../../order-ingredients/ingredients-row/ingredients-row";


function OrderComposition({ ingredientList }) {
  // получаем из исходного списка объект с ключами-id и полями-массивами
  // длина массива = количество ингредиентов с этим id в переданном списке
  const sortedIngredients = React.useMemo(() =>
    findDuplicates(ingredientList),
  [ingredientList]);

  // передаем каждой строке состава id ингредиента и их количество
  const section = React.useMemo(() => {
    return Object.keys(sortedIngredients).map((key) => {
      return <IngredientsRow id={key} count={sortedIngredients[key].length} key={key} />;
    })
  }, [sortedIngredients])


  return (
    <section className={styles.section}>
      <h4 className="mt-15 mb-6 text text_type_main-medium">Состав:</h4>
      <ul className={styles.list}>
        {section}
      </ul>
    </section>
  );
}

OrderComposition.propTypes = {
  ingredientList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default OrderComposition;
