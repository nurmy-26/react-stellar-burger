import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ingredient-circle.module.css";
import { getIngredientsList } from "../../../../services/selectors/ingredients";


function IngredientCircle({ itemId, style }) {

  const ingredientList = useSelector(getIngredientsList);
  // находим ингредиент по переданному id
  const detailsData = ingredientList.find(item => item._id === itemId);

  return (
    <li className={styles.circleBack} style={style}>
      <div className={styles.circleFront}>
        { detailsData &&
          <img className={styles.img} src={detailsData.image} alt={detailsData.name} />}
      </div>
    </li>
  );
}

IngredientCircle.propTypes = {
  // src: PropTypes.string.isRequired,
  // alt: PropTypes.string.isRequired
}

export default IngredientCircle;
