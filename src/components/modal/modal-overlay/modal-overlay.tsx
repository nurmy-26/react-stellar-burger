import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";


type Props = {
  onClose: () => void;
}

function ModalOverlay({ onClose }: Props) {

  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
  }

export default ModalOverlay;
