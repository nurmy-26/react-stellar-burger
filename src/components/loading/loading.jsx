import React from "react";
import PropTypes from "prop-types";
import styles from "./loading.module.css";


// при возможном использовании в других местах можно передать другой текст через children
function Loading(props) {
  const commonStyle = styles.text + ' ' + (props.children ? styles.rotation : styles.rotationWide);
  return (
    <p className={commonStyle}>
      {!props.children ? "Идет загрузка..." : props.children}
    </p>
  );
}

Loading.propTypes = {
  children: PropTypes.string,
  }

export default Loading;
