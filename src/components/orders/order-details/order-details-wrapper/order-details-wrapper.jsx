import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details-wrapper.module.css";


const OrderDetailsWrapper = ({ component, title }) => {

  return (
    <div className={styles.wrapper}>
      {title && <h2 className="text text_type_main-large">{title}</h2>}
      {component}
    </div>
  );
};

OrderDetailsWrapper.propTypes = {
  component: PropTypes.node.isRequired,
  title: PropTypes.string
}

export default OrderDetailsWrapper;
