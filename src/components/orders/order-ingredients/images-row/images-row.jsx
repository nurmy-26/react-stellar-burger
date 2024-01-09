import React from "react";
import PropTypes from "prop-types";
import styles from "./images-row.module.css";
import { getUniqueItems } from "../../../../utils/helpers";
import IngredientCircle from "../ingredient-circle/ingredient-circle";


function ImagesRow({ idList }) {
  // находим уникальные ингредиенты
  let uniqueItems = React.useMemo(() =>
    getUniqueItems(idList),
  [idList]);
  let overflowCount = 0;

  // рассчитываем число элементов свыше 6 и ограничиваем массив первыми 6 элементами
  if (uniqueItems.length > 6) {
    overflowCount = uniqueItems.length - 6;
    uniqueItems = uniqueItems.slice(0, 6);
  }

  const MemoImgCircle = React.memo(IngredientCircle)
  // рендерим массив с максимум 6 элементами
  const section = React.useMemo(() => {
    return uniqueItems.map((id, index) => {
      return <MemoImgCircle tag="li" itemId={id} key={index} style={{ left: -16 * index, zIndex: 6 - index }} />;
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

ImagesRow.propTypes = {
  idList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default React.memo(ImagesRow);
