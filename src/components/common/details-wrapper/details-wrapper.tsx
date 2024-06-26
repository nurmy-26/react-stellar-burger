import React, { ReactNode } from "react";
import styles from "./details-wrapper.module.css";


type Props = {
  component: ReactNode;
  title?: string;
}

const DetailsWrapper = ({ component, title }: Props) => {

  return (
    <div className={styles.wrapper}>
      {title && <h2 className="text text_type_main-large">{title}</h2>}
      {component}
    </div>
  );
};

export default DetailsWrapper;
