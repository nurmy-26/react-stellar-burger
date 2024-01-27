import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./action-string.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


type Props = {
  children: ReactNode;
  label?: string;
  path: string;
}

function ActionString({ children, label, path }: Props) {

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
