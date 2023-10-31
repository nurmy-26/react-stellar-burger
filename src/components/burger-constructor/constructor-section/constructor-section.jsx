import React from "react";
// import PropTypes from "prop-types";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";
// import {ingredientPropType} from "../../../utils/prop-types";
import { ConstructorContext } from "../../../services/orderContext";
import { v4 as uuidv4 } from 'uuid'; // библиотека для генерации случайного id


// memo - чтобы секция реже рендерилась
const ConstructorSection = React.memo(() => {

  // достаем из контекста деструктуризуемые данные
  const {constructorState} = React.useContext(ConstructorContext)

  // constructorState["ingredients"] - список ингредиентов в заказе, формирующийся по клику (потом - dnd)
  const section = React.useMemo(() => {
    return constructorState["ingredients"].map((item) => {
      const itemKey = uuidv4(); // генерируем случайный id для key
      return <ConstructorItem item={item} key={itemKey} />;
    })
  }, [constructorState])

  return (
    <ul className={styles.wrapper}>
      {section}
    </ul>
  );
});


// ConstructorSection.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType).isRequired
// }

export default React.memo(ConstructorSection);
