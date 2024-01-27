import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useDispatch } from "../../hooks/redux-hooks";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { checkUserAuth } from "../../services/actions/auth";
import { requestIngredientsData } from '../../services/actions/ingredients'
import AppHeader from "../app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "../protected-component";
import { FeedPage, ForgotPasswordPage, LoginPage, MainPage, NotFound404,
  ProfilePage, RegisterPage, ResetPasswordPage } from "../../pages";
import ProfileInfo from "../profile/profile-info/profile-info";
import ProfileHistory from "../profile/profile-history/profile-history";
import DetailsWrapper from "../common/details-wrapper/details-wrapper";
import OrderDetailsWrapper from "../orders/order-details/order-details-wrapper/order-details-wrapper";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../orders/order-details/order-details";
import Modal from "../modal/modal";



function App() {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // существует ли state у текущего роута; если да - присвоим переменной значение state.background (в т.ч. undefined)
  // т.о. мы запоминаем страницу, с которой открыли модалку (для дальнейшего использования её в кач-ве подложки)
  const background = location.state && location.state.background

  // при закрытии модалки возвращаемся на роут, с которого её открывали (и который записан в background)
  const closeTooltip = () => {
    navigate(-1);
  }

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(requestIngredientsData());
    // запрашиваем список ингредиентов именно здесь (1 раз при запуске приложения), а не в компоненте ингредиентов, чтобы не посылать запрос каждый раз при ре-рендере секции
  }, []);

  const MemoAppHeader = React.memo(AppHeader);

  return (
    <>
      <MemoAppHeader/>

      {/* передавая location в Routes, мы не позволим ему использовать фактическое location, если задан background */}
      <Routes location={ background || location }>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:id"
          element={<DetailsWrapper component={<IngredientDetails />} title="Детали ингредиента" />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number"
          element={<OrderDetailsWrapper />} />

        {/* только для не авторизованных */}
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

        {/* только для авторизованных */}
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route path="/profile" element={<OnlyAuth component={<ProfileInfo />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<ProfileHistory />} />} />
        </Route>
        <Route path="/profile/orders/:number"
          element={<OrderDetailsWrapper />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* когда background задан, откроет модалку (с подложкой в виде роута, записанного в background) вместо IngredientDetails */}
      { background &&
      <Routes>
        <Route path="/ingredients/:id" element={
          <Modal header="Детали ингредиента" onClose={closeTooltip}>
            <IngredientDetails />
          </Modal>
        } />
        <Route path="/feed/:number" element={
          <Modal type="number" onClose={closeTooltip}>
            <OrderDetails />
          </Modal>
        } />
        <Route path="/profile/orders/:number" element={
          <Modal type="number" onClose={closeTooltip}>
            <OrderDetails />
          </Modal>
        } />
      </Routes>

      }
    </>
  );
}

export default App;
