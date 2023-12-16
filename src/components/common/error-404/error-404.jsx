import React from "react";
import { Link } from "react-router-dom";
import styles from "./error-404.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


function Error404() {

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.error}>404</h1>
      <p className={styles.subtitle}>Страница не найдена :(</p>

      {/* #todo - пофиксить неправильное отображение в ссылке */}
      <p className={styles.text}>Вы можете вернуться <Link to={-1}>
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.btn}>назад</Button>
        </Link> или воспользоваться навигацией сверху</p>
    </div>
  );
}

export default Error404;
