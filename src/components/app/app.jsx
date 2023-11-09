import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loading from "../loading/loading";
import { requestIngredientsData } from '../../services/actions/ingredients'
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/selectors/ingredients";


function App() {
  const ingredientsData = useSelector(getIngredientsData);
  const dispatch = useDispatch();

  // запрос списка ингредиентов при монтировании
  React.useEffect(() => {
    dispatch(requestIngredientsData())
  }, [])

  return (
    <React.Fragment>
      <AppHeader/>

      <main className={styles.main}>
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
      </main>
    </React.Fragment>
  );
}

export default App;
