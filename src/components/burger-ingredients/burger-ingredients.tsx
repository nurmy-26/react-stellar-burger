import React, { MutableRefObject, RefObject } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from "./ingredient-section/ingredient-section";


function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  // прокрутка к нужной секции
  const bun = React.useRef<HTMLInputElement>(null);
  const sauce = React.useRef<HTMLInputElement>(null);
  const main = React.useRef<HTMLInputElement>(null);

  const onNavClick = (el: RefObject<HTMLInputElement>) => {
    switch (el) {
      case bun:
        setCurrent("bun");
        break;
      case sauce:
        setCurrent("sauce");
        break;
      case main:
        setCurrent("main");
        break;
    }

    el.current?.scrollIntoView({behavior: 'smooth'});
  }

  // отслеживание ближайшей секции к навигации
  const handleScroll = () => {
    const tabNavigation = document.querySelector('.tab');
    const bunEl = document.querySelector('.bun');
    const sauseEl = document.querySelector('.sauce');
    const mainEl = document.querySelector('.main');

    const tabY = tabNavigation?.getBoundingClientRect().y;
    const bunY = bunEl?.getBoundingClientRect().y;
    const sauseY = sauseEl?.getBoundingClientRect().y;
    const mainY = mainEl?.getBoundingClientRect().y;

    // расстояния от навигации до нужной секции
    const bunDistance = bunY! - tabY! ;
    const sauseDistance = sauseY! - tabY!;
    const mainDistance = mainY! - tabY!;

    const bunObj = {
      name: 'bun',
      distance: bunDistance
    }
    const sauseObj = {
      name: 'sauce',
      distance: sauseDistance
    }
    const mainObj = {
      name: 'main',
      distance: mainDistance
    }

    // сортируем массив с расстояниями так, чтобы первым элементом всегда был объект с минимальным расстоянием по модулю (что и будет минимальным расстоянием до навигации)
    const arr = [bunObj, sauseObj, mainObj].sort((a,b) => Math.abs(a.distance) - Math.abs(b.distance))
    const closestTab = arr[0].name

    setCurrent(closestTab); // подсвечиваем нужную секцию
  };


  React.useEffect(() => {
    const sectionWithScroll = document.querySelector('.custom-scroll');
    sectionWithScroll?.addEventListener("scroll", handleScroll);
    return () => sectionWithScroll?.removeEventListener("scroll", handleScroll);
  });

  const MemoIngredientSection = React.memo(IngredientSection);
  const MemoTab = React.memo(Tab);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Соберите бургер</h1>

      <nav className={styles.nav}>
        <MemoTab value="bun" active={current === 'bun'} onClick={() => onNavClick(bun)}>
          Булки
        </MemoTab>
        <MemoTab value="sauce" active={current === 'sauce'} onClick={() => onNavClick(sauce)}>
          Соусы
        </MemoTab>
        <MemoTab value="main" active={current === 'main'} onClick={() => onNavClick(main)}>
          Начинки
        </MemoTab>
      </nav>

      <div className={styles.wrapper}>
        <MemoIngredientSection ref={bun} type="bun" />
        <MemoIngredientSection ref={sauce} type="sauce" />
        <MemoIngredientSection ref={main} type="main" />
      </div>
    </section>
  );
}

export default BurgerIngredients;
