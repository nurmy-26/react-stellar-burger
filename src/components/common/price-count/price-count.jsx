import React from "react";
import PropTypes from "prop-types";
import styles from "./price-count.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function PriceCount({children, size='s'}) {
  let totalClasses = styles.total;
  switch(size) {
    case "s":
      totalClasses += (' ' + styles.totalS);
      break;
    case "m":
      totalClasses += (' ' + styles.totalM);
      break;
  }

  const MemoCurrencyIcon = React.memo(CurrencyIcon);

  return (
    <span className={totalClasses}>
      {children}
      <MemoCurrencyIcon type="primary" />
    </span>
  );
};

PriceCount.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string
}

export default React.memo(PriceCount);
