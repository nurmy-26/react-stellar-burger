import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-section.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import {ingredientPropType} from "../../../utils/prop-types";

// на вход data и type (какой тип будем прогонять через создание - булки, соуса и тд)
function IngredientSection({data, type}) {
  const filteredList = data.filter(item => item.type == type);
  const section = filteredList.map((item) => {
    return <IngredientCard itemInfo={item} key={item._id} />;
  });

  let sectionTitle;
  switch (type) {
    case "bun":
      sectionTitle = "Булки";
      break;
    case "main":
      sectionTitle = "Начинки";
      break;
    case "sauce":
      sectionTitle = "Соусы";
      break;
  }


  return (
    <section>
      <h2 className={styles.title}>{sectionTitle}</h2>
      <ul className={styles.list}>
        {section}
      </ul>
    </section>
  );
}

IngredientSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default IngredientSection;
