import React, { FormEvent, ReactNode } from "react";
import styles from "./request-form.module.css";


type Props = {
  children?: ReactNode;
  extraClass?: string;
  formName?: string;
  onReset?: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title?: string;
}

function RequestForm({ children, extraClass, formName, onReset, onSubmit, title }: Props) {
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

export default RequestForm;
