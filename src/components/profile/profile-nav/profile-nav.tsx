import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./profile-nav.module.css";
import { logout } from "../../../services/actions/auth";
import Logout from "../logout/logout";


function ProfileNav() {
  const dispatch = useDispatch();
  let location = useLocation();

  const activeClasses = styles.link + ' ' + styles.link_active;

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout())
  }

  return (
    <aside className={styles.container}>
      <nav className="mb-20">
        <ul className={styles.list}>
          <li>
            {/* end для более четкого сопоставления path */}
            <NavLink to="/profile" end className={({isActive}) => isActive ? activeClasses : styles.link}>
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile/orders" className={({isActive}) => isActive ? activeClasses : styles.link}>
              История заказов
            </NavLink>
          </li>

          <li>
            <Logout onClick={handleLogout}>Выход</Logout>
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

export default ProfileNav;
