import { ReactElement, ReactNode } from "react";
import { useSelector } from "../hooks/redux-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthChecked, getUser } from "../services/selectors/auth";


type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element | null;
}
// ReactNode | JSX.Element
const Protected = ({ onlyUnAuth = false, component }: Props): JSX.Element | null => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null;
  }

  if (onlyUnAuth && user) {
    // если роут только для неавторизованных пользователей, а поль-ль авторизован, то
    // редирект на главную страницу или на адрес, который записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // если роут только для авторизованных пользователей, а поль-ль не авторизован, то
    // редирект на главную страницу + запоминаем текущий адрес в from, чтобы после авторизации попасть на эту страницу
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // если тип пользователя и тип маршрута совпадают, то рендерим компонент
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: Props) => (
  <Protected onlyUnAuth={true} component={component} />
);
