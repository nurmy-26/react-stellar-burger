import React from "react";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";

// на вход data
function ConstructorSection(props) {
  // const section = props.data.map((item) => {
  //   return <ConstructorItem item={item} key={item._id} />;
  // });

  // промежуточный вариант - берем из data (всё, кроме булки)
  // потом видимо ингредиенты будут браться по клику из меню слева
  const section = []
  props.data.forEach((item, index, arr) => {
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

export default ConstructorSection;
