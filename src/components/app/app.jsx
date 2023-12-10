import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { ForgotPasswordPage, LoginPage, MainPage, NotFound404,
  ProfilePage, RegisterPage, ResetPasswordPage } from "../../pages";
import ProfileInfo from "../profile-info/profile-info";
import ProfileHistory from "../profile-history/profile-history";


function App() {

  return (
    <Router>
      <AppHeader/>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/profile/orders" element={<ProfileHistory />} />
        </Route>
        {/* <Route path="/ingredients/:id" element={<IngredientPage />} /> */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
