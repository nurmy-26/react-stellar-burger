import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientSection from "./ingredient-section/ingredient-section";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../utils/prop-types";


function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('bun');

  // прокрутка к нужной секции
  const bun = React.useRef()
  const sauce = React.useRef()
  const main = React.useRef()
  const onNavClick = (el) => {
    switch (el) {
      case bun:
        setCurrent("bun");
        break;
      case main:
        setCurrent("main");
        break;
      case sauce:
        setCurrent("sauce");
        break;
    }

    el.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Соберите бургер</h1>

      <nav className={styles.nav}>
        <Tab value="bun" active={current === 'bun'} onClick={() => onNavClick(bun)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => onNavClick(sauce)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => onNavClick(main)}>
          Начинки
        </Tab>
      </nav>

      <div className={styles.wrapper}>
        <IngredientSection ref={bun} type="bun" data={props.data} />
        <IngredientSection ref={sauce} type="sauce" data={props.data} />
        <IngredientSection ref={main} type="main" data={props.data} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}


export default BurgerIngredients;
