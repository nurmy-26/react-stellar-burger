import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import {ingredientPropType} from "../../../utils/prop-types";


function IngredientDetails({cardInfo}) {
  const {image, image_large, name, calories, proteins, fat, carbohydrates} = cardInfo;

  return (
    <div className={styles.details}>
      <img className={styles.img} src={image_large} alt={name} />
      <h3 className={styles.name}>{name}</h3>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h4 className={styles.category}>Калории,ккал</h4>
          <p className={styles.number}>{calories}</p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.category}>Белки, г</h4>
          <p className={styles.number}>{proteins}</p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.category}>Жиры, г</h4>
          <p className={styles.number}>{fat}</p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.category}>Углеводы, г</h4>
          <p className={styles.number}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  cardInfo: ingredientPropType
}


export default IngredientDetails;
