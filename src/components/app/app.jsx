import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkUserAuth } from "../../services/actions/auth";
import AppHeader from "../app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "../protected-component";
import { ForgotPasswordPage, LoginPage, MainPage, NotFound404,
  ProfilePage, RegisterPage, ResetPasswordPage } from "../../pages";
import ProfileInfo from "../profile-info/profile-info";
import ProfileHistory from "../profile-history/profile-history";


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <Router>
      <AppHeader/>

      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/ingredients/:id" element={<IngredientPage />} /> */}

        {/* только для не авторизованных */}
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

        {/* только для авторизованных */}
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route path="/profile" element={<OnlyAuth component={<ProfileInfo />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<ProfileHistory />} />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
