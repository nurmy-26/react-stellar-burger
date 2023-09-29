import React from "react";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";

// на вход - ...
function ConstructorSection(props) {
  const section = props.data.map((item, index, arr) => {
    let type = true;
    if (index == 0) {
      type = "top";
    } else if (index == arr.length-1) {
      type = "bottom";
    }

    return <ConstructorItem item={item} type={type} key={item._id} />;
  });

  return (
    <ul className={styles.wrapper}>
      {section}
    </ul>
  );
};

export default ConstructorSection;
