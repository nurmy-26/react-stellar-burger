import React from "react";
import styles from "./burger-constructor.module.css";
import ConstructorSection from "./constructor-section/constructor-section";
import ConstructorTotal from "./constructor-total/constructor-total";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructor(props) {
// фиксированное число - временное решение
// будет подниматься из дочернего ConstructorSection, суммируя стоимость всех элементов
  const total = 610;

  return (
    <section aria-label="Ингредиенты" className={styles.section}>
      <div className={styles.item}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
      </div>
      <ConstructorSection data={props.data} />
      <div className={styles.item}>
        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
      </div>

      <ConstructorTotal>{total}</ConstructorTotal>

    </section>
  );
}

export default BurgerConstructor;
