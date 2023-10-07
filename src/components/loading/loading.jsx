import React from "react";
import styles from "./loading.module.css";


// при возможном использовании в других местах можно передать другой текст через children
function Loading(props) {
  const commonStyle = styles.text + ' ' + styles.rotation;
  return (
    <p className={commonStyle}>
      {!props.children ? "Идет загрузка..." : props.children}
    </p>
  );
}

export default Loading;
