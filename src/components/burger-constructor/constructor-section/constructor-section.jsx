import React from "react";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";
import { useSelector } from "react-redux";
import { getConstructorData } from "../../../services/selectors/burger-constructor";


// memo - чтобы секция реже рендерилась
const ConstructorSection = React.memo(() => {
  const constructorData = useSelector(getConstructorData);

  // constructorData["ingredients"] - список ингредиентов в заказе, формирующийся по клику (потом - dnd)
  const section = React.useMemo(() => {
    return constructorData["ingredients"].map((item) => {
      return <ConstructorItem item={item} key={item.key} />;
    })
  }, [constructorData])

  return (
    <ul className={styles.wrapper}>
      {section}
    </ul>
  );
});

export default ConstructorSection;
