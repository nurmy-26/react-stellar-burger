import React from "react";
import PropTypes from "prop-types";
import styles from "./loading.module.css";


function Loading({type = 'slowSlicing', children}) {
  let commonStyle;

  switch(type) {
    case "slowSlicing":
      commonStyle += (' ' + styles.slowSlicing);
      break;
    case "loadingPoints":
      commonStyle += (' ' + styles.loadingPoints);
      break;
  }

  return (
    <span className={commonStyle}>
      {!children ? "Идет загрузка..." : children}
    </span>
  );
}

Loading.propTypes = {
  children: PropTypes.string,
}

export default Loading;
