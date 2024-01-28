import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./error-404.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


function Error404() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.error}>404</h1>
      <p className={styles.subtitle}>Страница не найдена :(</p>

      <p className={styles.text}>Вы можете вернуться
        <Button onClick={back} htmlType="button" type="secondary" size="medium" extraClass={styles.btn}>
          &#160;назад&#160;
        </Button>
        или воспользоваться навигацией сверху</p>
    </div>
  );
}

export default Error404;
