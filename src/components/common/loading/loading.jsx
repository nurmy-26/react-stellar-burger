import React from "react";
import PropTypes from "prop-types";
import styles from "./loading.module.css";


function Loading({ children, extraClass, type = 'slowSlicing' }) {
  let commonStyle = styles.commonStyle;

  switch(type) {
    case "slowSlicing":
      commonStyle += (' ' + styles.slowSlicing);
      break;
    case "loadingPoints":
      commonStyle += (' ' + styles.loadingPoints);
      break;
  }

  const loaderClasses = commonStyle + ' ' + extraClass;

  return (
    <span className={loaderClasses}>
      {!children ? "Идет загрузка..." : children}
    </span>
  );
}

Loading.propTypes = {
  children: PropTypes.string,
  extraClass: PropTypes.string,
  type: PropTypes.string
}

export default Loading;
