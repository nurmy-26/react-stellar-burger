import React from "react";
import styles from "./modal-header.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function ModalHeader(props) {
  const {children, onClose} = props;

  return (
    <div className={styles.header}>
      <h2 className="text text_type_main-large">{children}</h2>
      <button className={styles.btn} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
}

export default ModalHeader;
