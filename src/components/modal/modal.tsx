import React, { KeyboardEvent } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";


type Props = {
  children: string;
  header: string;
  onClose: () => void;
  type?: string;
}

function Modal({children, header, onClose, type}: Props) {
  // для модалки заказа достаем number из url
  const { number } = useParams();

  // слушатель по Ecs
  React.useEffect(() => {
    const closeByEsc = (evt: any) => { // evt: KeyboardEvent<Element>
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
          <ModalHeader onClose={onClose} extraClass={!type ? '' : "text text_type_digits-default"}>
            {!type ? header : "#" + number}
          </ModalHeader>
          {children}
        </div>

        <ModalOverlay onClose={onClose} />
      </>
    ), document.getElementById("react-modals") as Element
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default Modal;
