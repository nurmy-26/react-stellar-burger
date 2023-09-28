import React from "react";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {/* #todo вместо styles.item_active и type="primary" - подставить переменные(?) которые по умолчанию имеют одно значение, а при выборе меняются (активное, подсвеченное состояние)*/}
          <li><a className={`${styles.item} ${styles.item_active}`}>
            <BurgerIcon type="primary" />
            Конструктор
          </a></li>
          <li><a className={styles.item}>
            <ListIcon type="secondary" />
            Лента заказов
          </a></li>
        </nav>
        <Logo />
        <button className={`${styles.item} ${styles.button}`}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </button>
      </header>
    </div>
  );
}

export default AppHeader;
