import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-header.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function ModalHeader({children, extraClass, onClose}) {
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

ModalHeader.propTypes = {
  children: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  onClose: PropTypes.func.isRequired
  }

export default ModalHeader;
