import React from "react";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}><ul className={styles.list}>
          {/* #todo вместо styles.item_active и type="primary" - подставить переменные(?) которые по умолчанию имеют одно значение, а при выборе меняются (активное, подсвеченное состояние)*/}
          <li><a className={`${styles.item} ${styles.item_active}`}>
            <BurgerIcon type="primary" />
            Конструктор
          </a></li>
          <li><a className={styles.item}>
            <ListIcon type="secondary" />
            Лента заказов
          </a></li>
        </ul></nav>

        <div className={styles.item_centered}><Logo /></div>

        <div className={styles.profile}>
          <button className={`${styles.item} ${styles.button}`}>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </button>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;
