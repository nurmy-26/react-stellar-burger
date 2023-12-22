import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-row.module.css";
import IngredientCircle from "./ingredient-circle/ingredient-circle";


function IngredientsRow({ idList }) {
    // #todo - вынести функцию в utils
  const getUniqueItems = (arr) => {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
  }
  let uniqueItems = getUniqueItems(idList);
  let overflowCount = 0;

  if (uniqueItems.length > 6) {
    overflowCount = uniqueItems.length - 6; // рассчитываем количество элементов свыше 6
    uniqueItems = uniqueItems.slice(0, 6); // ограничиваем массив до первых 6 элементов
  }

  const MemoImgCircle = React.memo(IngredientCircle)
  const section = React.useMemo(() => {
    return uniqueItems.map((id, index) => {
      return <MemoImgCircle itemId={id} key={index} style={{ left: -16 * index, zIndex: 6 - index }} />;
    })
  }, [uniqueItems])

  return (
    <ul className={styles.list}>
      {/* кружки с ингредиентами */}
      { uniqueItems.length > 0 && section }

      {/* счетчик ингредиентов, которые не поместились */}
      { overflowCount > 0 && (
        <li className={styles.overflowCount}>
          +{overflowCount}
        </li>
      )}
    </ul>
  );
}

IngredientsRow.propTypes = {
  idList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default IngredientsRow;
