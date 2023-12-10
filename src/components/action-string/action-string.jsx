import React from "react";
import { Link } from "react-router-dom";
import styles from "./action-string.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


function ActionString({ children, label, path }) {

  return (
    <p className={styles.text}>
      {children}

      <Link to={path}>
        <Button htmlType="button" type="secondary" size="medium" extraClass={styles.btn}>{label}</Button>
      </Link>
    </p>
  );
}

export default ActionString;
