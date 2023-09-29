import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";
import {ingredientPropType} from "../../../utils/prop-types";

// на вход data
function ConstructorSection({data}) {
  // const section = props.data.map((item) => {
  //   return <ConstructorItem item={item} key={item._id} />;
  // });

  // промежуточный вариант - берем из data (всё, кроме булки)
  // потом видимо ингредиенты будут браться по клику из меню слева
  const section = []
  data.forEach((item, index) => {
    if (index !== 0) {
      section.push(<ConstructorItem item={item} key={item._id} />);
    }

  });

  return (
    <ul className={styles.wrapper}>
      {section}
    </ul>
  );
};


ConstructorSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default ConstructorSection;
