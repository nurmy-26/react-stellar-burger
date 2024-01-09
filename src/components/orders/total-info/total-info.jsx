import React from "react";
import PropTypes from "prop-types";
import styles from "./total-info.module.css";


function TotalInfo({ children, extraClass, text }) {
  const wrapperClasses = styles.wrapper + ' ' + extraClass;

  return (
    <div className={wrapperClasses}>
      <h2 className="text text_type_main-medium">{text}</h2>
      <p className={styles.digits}>{children}</p>
    </div>
  );
}

TotalInfo.propTypes = {
  children: PropTypes.number.isRequired,
  extraClass: PropTypes.string,
  text: PropTypes.string,
}

export default React.memo(TotalInfo);
