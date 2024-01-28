import React, { ReactNode } from 'react';
import styles from './main-container.module.css';


type Props = {
  children?: ReactNode;
  extraClass?: string;
}

const MainContainer = ({ children, extraClass }: Props) => {
  const className = `${styles.main} ${extraClass}`;

  return (
    <main className={className}>
      {children}
    </main>
  );
};

export default MainContainer;
