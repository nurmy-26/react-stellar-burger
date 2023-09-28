import React from "react";
import styles from "./burger-constructor.module.css";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  return (
    <section className={styles.section}>
      <Logo />
    </section>
  );
}

export default BurgerConstructor;
