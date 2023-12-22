import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
  const activeClasses = styles.link + ' ' + styles.link_active;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.list}>

            <ul className={`${styles.list} ${styles.link_start}`}>
              <li>
                <NavLink to="/" className={({isActive}) => isActive ? activeClasses : styles.link}>
                    <BurgerIcon />
                    Конструктор
                </NavLink>
              </li>
              <li>
                <NavLink to="/feed" className={({isActive}) => isActive ? activeClasses : styles.link}>
                  <ListIcon />
                  Лента заказов
                </NavLink>
              </li>
            </ul>

            <li className={styles.link_centered}>
              <NavLink to="/">
                <Logo />
              </NavLink>
            </li>

            <li className={styles.link_end}>
              <NavLink to="/profile" className={({isActive}) => isActive ? activeClasses : styles.link}>
                <ProfileIcon />
                Личный кабинет
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default AppHeader;
