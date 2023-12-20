import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./page.module.css";
import MainContainer from "../components/common/main-container/main-container";
import ProfileNav from "../components/profile-nav/profile-nav";


function ProfilePage() {

  return (
    <MainContainer extraClass={styles.marginMedium}>
      <ProfileNav />

      <div className={styles.content}>
        <Outlet />
      </div>
    </MainContainer>
  );
}

export default ProfilePage;
