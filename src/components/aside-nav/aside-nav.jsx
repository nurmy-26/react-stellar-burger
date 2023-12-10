import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./aside-nav.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";


function AsideNav() {
  let location = useLocation();
  const activeClasses = styles.link + ' ' + styles.link_active;

  return (
    <aside className={styles.container}>
      <nav className="mb-20">
        <ul className={styles.list}>
          <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? activeClasses : styles.link}>
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile/orders" className={({isActive}) => isActive ? activeClasses : styles.link}>
              История заказов
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className={({isActive}) => isActive ? activeClasses : styles.link}>
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>

      {location.pathname === '/profile' &&
        (<p className={`text text_type_main-default text_color_inactive ${styles.review}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>)
      }

      {location.pathname === '/profile/orders' &&
        (<p className={`text text_type_main-default text_color_inactive ${styles.review}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>)
      }
    </aside>
  );
}

export default AsideNav;
