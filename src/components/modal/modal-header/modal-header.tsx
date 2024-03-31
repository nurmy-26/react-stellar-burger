import React from "react";
import styles from "./modal-header.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


type Props = {
  children: string;
  extraClass?: string;
  onClose: () => void;
}

function ModalHeader({children, extraClass, onClose}: Props) {
  const headerClasses = "text text_type_main-large" + ' ' + extraClass;

  return (
    <div className={styles.header}>
      <h2 className={headerClasses}>{children}</h2>
      <button className={styles.btn} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
}

export default ModalHeader;
