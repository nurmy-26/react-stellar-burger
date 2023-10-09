import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-header.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function ModalHeader({children, onClose}) {
  return (
    <div className={styles.header}>
      <h2 className="text text_type_main-large">{children}</h2>
      <button className={styles.btn} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
  }

export default ModalHeader;
