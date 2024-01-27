import React from "react";
import { useSelector } from "../../../hooks/redux-hooks";
import styles from "./constructor-total.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import PriceCount from "../../common/price-count/price-count";


type Props = {
  children: number;
  onOpen: (e: React.SyntheticEvent<Element, Event>) => void;
}

function ConstructorTotal({ children, onOpen }: Props) {
  const constructorData = useSelector(getConstructorData);
  const MemoButton = React.memo(Button);

  return (
    <div className={styles.wrapper}>
      <PriceCount size="m">{children}</PriceCount>

      <MemoButton onClick={onOpen} disabled={constructorData["bun"] === null} htmlType="button" type="primary" size="large">Оформить заказ</MemoButton>
    </div>
  );
};

export default React.memo(ConstructorTotal);
