import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorSection from "./constructor-section/constructor-section";


function BurgerConstructor(props) {


  return (
    <section aria-label="Ингредиенты" className={styles.section}>
      <ConstructorSection data={props.data} />
    </section>
  );
}

export default BurgerConstructor;
