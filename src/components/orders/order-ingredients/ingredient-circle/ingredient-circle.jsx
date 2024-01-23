import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ingredient-circle.module.css";
import { findItem } from "../../../../utils/helpers";
import { getIngredientsList } from "../../../../services/selectors/ingredients";


function IngredientCircle({ itemId, style, tag='div' }) {
  const Tag = tag;
  const ingredientList = useSelector(getIngredientsList);
  // находим ингредиент по переданному id
  const detailsData = React.useMemo(() =>
    findItem(ingredientList, itemId),
  [ingredientList]);

  return (
    <Tag className={styles.circleBack} style={style}>
      <div className={styles.circleFront}>
        { detailsData &&
          <img className={styles.img} src={detailsData.image} alt={detailsData.name} />}
      </div>
    </Tag>
  );
}

IngredientCircle.propTypes = {
  itemId: PropTypes.string,
  style: PropTypes.shape({
    left: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
  }),
  tag: PropTypes.string,
}

export default IngredientCircle;
