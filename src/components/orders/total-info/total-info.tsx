import React from "react";
import styles from "./total-info.module.css";


type Props = {
  children: number;
  extraClass?: string;
  text?: string;
}

function TotalInfo({ children, extraClass, text }: Props) {
  const wrapperClasses = styles.wrapper + ' ' + extraClass;

  return (
    <div className={wrapperClasses}>
      <h2 className="text text_type_main-medium">{text}</h2>
      <p className={styles.digits}>{children}</p>
    </div>
  );
}

export default React.memo(TotalInfo);
