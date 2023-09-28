import React from "react";
import styles from "./ingredient-section.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";

// на вход data и type (какой тип будем прогонять через создание - булки, соуса и тд)
function IngredientSection(props) {
  const filteredList = props.data.filter(item => item.type == props.type);
  const section = filteredList.map((item) => {
    return <IngredientCard itemInfo={item} key={item._id} />;
  });

  let sectionTitle;
  switch (props.type) {
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

export default IngredientSection;
