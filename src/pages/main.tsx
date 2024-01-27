import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "../hooks/redux-hooks";
import { getIngredientsData } from "../services/selectors/ingredients";
import MainContainer from "../components/common/main-container/main-container";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Loading from "../components/common/loading/loading";


function MainPage() {
  const ingredientsData = useSelector(getIngredientsData);

  return (
    <MainContainer extraClass="ps-s">
        {
          // если запрос прошел (и прошел успешно), рендерим ингредиенты и конструктор
        (ingredientsData.ingredients && ingredientsData.ingredients.length > 0 && !ingredientsData.isLoading && !ingredientsData.hasError) ? (
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
