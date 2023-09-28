import React from "react";
import styles from "./burger-ingredients.module.css";
// import { data } from "../../utils/data";
import IngredientSection from "./ingredient-section/ingredient-section";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Соберите бургер</h1>

      {/* <nav><ul className={styles.list}>
        <li><a className={`${styles.item} ${styles.item_active}`}>
          Булки
        </a></li>
        <li><a className={styles.item}>
          Соусы
        </a></li>
        <li><a className={styles.item}>
          Начинки
        </a></li>
      </ul></nav> */}

      <nav className={styles.nav}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>

      <div className={styles.wrapper}>
        <IngredientSection type="bun" data={props.data} />
        <IngredientSection type="sauce" data={props.data} />
        <IngredientSection type="main" data={props.data} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
