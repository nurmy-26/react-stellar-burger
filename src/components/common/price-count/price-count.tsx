import React from "react";
import styles from "./price-count.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const MemoCurrencyIcon = React.memo(CurrencyIcon);


type Props = {
  children: string | number;
  size?: string;
}

function PriceCount({children, size='s'}: Props) {
  let totalClasses = styles.total;
  switch(size) {
    case "s":
      totalClasses += (' ' + styles.totalS);
      break;
    case "m":
      totalClasses += (' ' + styles.totalM);
      break;
  }


  return (
    <span className={totalClasses}>
      {children}
      <MemoCurrencyIcon type="primary" />
    </span>
  );
};

export default React.memo(PriceCount);
