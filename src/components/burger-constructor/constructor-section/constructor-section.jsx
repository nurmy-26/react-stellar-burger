import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";
import {ingredientPropType} from "../../../utils/prop-types";


// memo - чтобы секция реже рендерилась
const ConstructorSection = React.memo(({data}) => {
  // промежуточный вариант - берем из data (всё, кроме булки, её индекс 0)
  // потом видимо ингредиенты будут браться по клику из меню слева
  const section = React.useMemo(() => {
    return data.filter((item, index) => {
      return index !== 0
    }).map((item) => {
      return <ConstructorItem item={item} key={item._id} />;
    })
  }, [data])

  return (
    <ul className={styles.wrapper}>
      {section}
    </ul>
  );
});


ConstructorSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default React.memo(ConstructorSection);
