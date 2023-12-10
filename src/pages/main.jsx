import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import MainContainer from "../components/main-container/main-container";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Loading from "../components/loading/loading";
import { requestIngredientsData } from '../services/actions/ingredients'
import { getIngredientsData } from "../services/selectors/ingredients";


function MainPage() {
  const ingredientsData = useSelector(getIngredientsData);
  const dispatch = useDispatch();

  // запрос списка ингредиентов при монтировании
  React.useEffect(() => {
    dispatch(requestIngredientsData())
  }, [])

  return (
    <MainContainer extraClass={styles.marginSmall}>
        {
          // если запрос прошел (и прошел успешно), рендерим ингредиенты и конструктор
        (ingredientsData.ingredients.length > 0 && !ingredientsData.isLoading && !ingredientsData.hasError) ? (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        ) : (
          // иначе - рендерим компонент загрузки
        <Loading />
        )}
      </MainContainer>
  );
}

export default MainPage;
