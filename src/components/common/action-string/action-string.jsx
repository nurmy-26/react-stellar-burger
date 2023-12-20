import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

ActionString.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  path: PropTypes.string.isRequired
}

export default ActionString;
