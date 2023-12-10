import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import AsideNav from "../components/aside-nav/aside-nav";
// import ProfileInfo from "../components/profile-info/profile-info";
import { Outlet } from "react-router-dom";


function ProfilePage() {

  return (
    <MainContainer extraClass={styles.marginMedium}>
      <AsideNav />

      <div className={styles.content}>
        {/* {location.pathname === '/profile' &&
          (<ProfileInfo />)
        } */}
        <Outlet />
      </div>
    </MainContainer>
  );
}

export default ProfilePage;
