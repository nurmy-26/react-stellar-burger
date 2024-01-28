import React from "react";
import { Outlet } from "react-router-dom";
import MainContainer from "../components/common/main-container/main-container";
import ProfileNav from "../components/profile/profile-nav/profile-nav";


function ProfilePage() {
  const MemoProfileNav = React.memo(ProfileNav);

  const contentStyles = {
    display: 'flex',
    width: '880px'
  };

  return (
    <MainContainer extraClass="ps-m">
      <MemoProfileNav />

      <div style={contentStyles}>
        <Outlet />
      </div>
    </MainContainer>
  );
}

export default ProfilePage;
