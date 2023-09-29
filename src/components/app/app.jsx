import React from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <React.Fragment>
      <AppHeader/>

      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </React.Fragment>
  );
}

export default App;
