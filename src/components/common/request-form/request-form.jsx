import React from "react";
import PropTypes from "prop-types";
import styles from "./request-form.module.css";


function RequestForm({ children, extraClass, formName, onReset, onSubmit, title }) {
  const formClasses = `${styles.form} ${extraClass}`;

  return (
    <>
      {title &&
      <h1 className={styles.title}>{title}</h1>
      }

      <form className={formClasses} name={formName} onSubmit={onSubmit} onReset={onReset}>
        {children}
      </form>
    </>
  );
}

RequestForm.propTypes = {
  children: PropTypes.node,
  extraClass: PropTypes.string,
  formName: PropTypes.string,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
}

export default RequestForm;
