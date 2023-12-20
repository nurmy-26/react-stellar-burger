import React from 'react';
import PropTypes from 'prop-types';
import styles from './main-container.module.css';


const MainContainer = ({ children, extraClass }) => {
  const className = `${styles.main} ${extraClass}`;

  return (
    <main className={className}>
      {children}
    </main>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node,
  extraClass: PropTypes.string
}

export default MainContainer;
