import React from "react";
import styles from "./logout.module.css";


type Props = {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Logout({ children, onClick }: Props) {

  return (
    <button className={`${styles.btn} text text_type_main-medium`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Logout;
