import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-loader.module.css";
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import pentagonA from "../../../images/pentagon-1.svg"
import pentagonB from "../../../images/pentagon-2.svg"
import pentagonC from "../../../images/pentagon-3.svg"


function ModalLoader({
  hasError=false,
  errorMessage='Что-то пошло не так :(',
  loadingText='Ожидаем данные...',
  size='s'}) {

  const containerClasses = styles.container + ' ' + (size === 'm' ? styles.containerMedium : '')
  const textClasses = styles.status + (hasError ? '' : (' ' + styles.animated));

  return (
    <div className={containerClasses}>
      <span className={textClasses}>{hasError ? errorMessage : loadingText}</span>
      <div className={styles.stub}>
        <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonA} alt="фоновый вектор" />
        <img className={`${styles.penta} ${styles.pentaA}`} src={pentagonB} alt="фоновый вектор" />
        <img className={`${styles.penta} ${styles.pentaB}`} src={pentagonC} alt="фоновый вектор" />
      </div>

      {/* доп-текст для ошибки */}
      {hasError &&
          <p className={styles.substatus}>
            <InfoIcon type="secondary" />
            Обратитесь в службу межгалактической поддержки
          </p>
      }
    </div>
  );
}

ModalLoader.propTypes = {
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  loadingText: PropTypes.string
}

export default ModalLoader;
