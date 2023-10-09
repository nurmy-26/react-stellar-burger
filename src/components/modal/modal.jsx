import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";


function Modal({children, header, onClose}) {
  // слушатель по Ecs
  React.useEffect(() => {
    function closeByEsc (evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEsc);

    return () => { document.removeEventListener('keydown', closeByEsc) };
  }, []);

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.modal}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
        </div>

        <ModalOverlay onClose={onClose} />
      </>
    ), document.getElementById("react-modals")
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
  }

export default Modal;
