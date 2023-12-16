import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styles from "./page.module.css";
import { getAuthChecked, getUser } from "../services/selectors/auth";
import MainContainer from "../components/common/main-container/main-container";
import ProfileNav from "../components/profile-nav/profile-nav";
import Loading from "../components/common/loading/loading"


function ProfilePage() {
  // const authChecked = useSelector(getAuthChecked);

  return (
    <MainContainer extraClass={styles.marginMedium}>
      <ProfileNav />

      <div className={styles.content}>
        {/* #todo */}
        {/* {
        // если данные юзера загрузились - рендерим содержимое; иначе - лоадер
        (authChecked) ? (
          <Outlet />
        ) : (
          // иначе - рендерим компонент загрузки
        <Loading type='loadingPoints' extraClass={styles.load}>Загружаем данные профиля...</Loading>
        )
        } */}
        <Outlet />
      </div>
    </MainContainer>
  );
}

export default ProfilePage;
