import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./page.module.css";
import MainContainer from "../components/common/main-container/main-container";
import ProfileNav from "../components/profile/profile-nav/profile-nav";


function ProfilePage() {
  const MemoProfileNav = React.memo(ProfileNav)

  return (
    <MainContainer extraClass={styles.marginMedium}>
      <MemoProfileNav />

      <div className={styles.content}>
        <Outlet />
      </div>
    </MainContainer>
  );
}

export default ProfilePage;
