import React from "react";
import styles from "./loading.module.css";


function Loading() {

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}

export default Loading;
