import React from "react";
import styles from "./page.module.css";
import MainContainer from "../components/common/main-container/main-container";
import Error404 from "../components/common/error-404/error-404";


function NotFound404() {

  return (
    <MainContainer extraClass={styles.marginLarge}>
      <Error404 />
    </MainContainer>
  );
}

export default NotFound404;
