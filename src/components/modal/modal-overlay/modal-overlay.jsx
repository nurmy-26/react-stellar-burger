import React from "react";
import styles from "./modal-overlay.module.css";


function ModalOverlay(props) {
  const {onClose} = props;
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
}

export default ModalOverlay;
