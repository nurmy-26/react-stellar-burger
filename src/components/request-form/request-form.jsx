import React from "react";
import { Link } from "react-router-dom";
import styles from "./request-form.module.css";


function RequestForm({ children, extraClass, formName, handleSubmit, title }) {
  const formClasses = `${styles.form} ${extraClass}`;

  return (
    <>
      {title &&
      <h1 className={styles.title}>{title}</h1>
      }

      <form className={formClasses} name={formName} onSubmit={handleSubmit}>
        {children}
      </form>
    </>
  );
}

export default RequestForm;
