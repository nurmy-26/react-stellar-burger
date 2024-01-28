import React from "react";
import MainContainer from "../components/common/main-container/main-container";
import Error404 from "../components/common/error-404/error-404";


function NotFound404() {

  return (
    <MainContainer extraClass="ps-l">
      <Error404 />
    </MainContainer>
  );
}

export default NotFound404;
