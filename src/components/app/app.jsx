import React from "react";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/api"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loading from "../loading/loading";
import { IngredientsContext } from "../../services/appContext";
import { ConstructorContext } from "../../services/orderContext";
import { orderReducer } from "../../utils/reducers";


function App() {
  // начальное состояние списка заказа
  const initialConstructorState = {
    // дефолтное значение булки (потом будет "выберите")
    bun: {
      "_id":"643d69a5c3f7b9001cfa093c",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png"
   },
    ingredients: [],
    // начальная стоимость складывается из двух дефолтных булок
    total: 2510
  }
  const [constructorState, orderDispatcher] = React.useReducer(orderReducer, initialConstructorState);

  // начальное состояние списка ингредиентов
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
    // очищаем при размонтировании, чтобы предотвратить утечку памяти
    return () => {
      setState({});
    };
  }, []);

  return (
    <React.Fragment>
      <AppHeader/>

      <main className={styles.main}>
        {
          // если запрос прошел (и прошел успешно), рендерим ингредиенты и конструктор
        (state.ingredientList.length > 0 && !state.isLoading && !state.hasError) ? (
          <>
            <IngredientsContext.Provider value={state}>
              <ConstructorContext.Provider value={{ constructorState, orderDispatcher }}>
                <BurgerIngredients data={state.ingredientList} />
                <BurgerConstructor />
              </ConstructorContext.Provider>
            </IngredientsContext.Provider>
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
