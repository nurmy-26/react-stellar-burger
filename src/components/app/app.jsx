import React from "react";
import styles from "./app.module.css";
// import { data } from "../../utils/data";
import {getIngredients} from "../../utils/api"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loading from "../loading/loading";


function App() {
  // начальное состояние
  const [state, setState] = React.useState({
    ingredientList: [],
    isLoading: false,
    hasError: false
  });

  React.useEffect(() => {
    // при монтировании устанавливаем значения state (начинается загрузка)
    setState({
      ...state,
      isLoading: true,
      hasError: false
    });

    // выполняем запрос данных с сервера
    getIngredients()
      .then(answer => setState({
        ...state,
        ingredientList: answer.data,
        isLoading: false,
      }))
      .catch(err => {
        setState({
        ...state,
        isLoading: false,
        hasError: true
      });
        console.error(err);
    })
  }, []);

  return (
    <React.Fragment>
      <AppHeader/>

      <main className={styles.main}>
        {
          // если запрос прошел (и прошел успешно), рендерим ингредиенты и конструктор
        (state.ingredientList.length > 0 && !state.isLoading && !state.hasError) ? (
          <>
            <BurgerIngredients data={state.ingredientList} />
            <BurgerConstructor data={state.ingredientList} />
          </>
        ) : (
          // иначе - рендерим компонент загрузки
        <Loading />
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
