import React from "react";
import { useDispatch, useSelector } from "../../../hooks/redux-hooks";
import { useDrop } from "react-dnd";
import styles from "./bun-container.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {TIngredient} from "../../../utils/types";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import { addBun } from "../../../services/slices/burger-constructor";
import ConstructorPlaceholder from "../constructor-placeholder/constructor-placeholder";


type Props = {
  type: "top" | "bottom";
}

function BunContainer({ type }: Props) {
  const constructorData = useSelector(getConstructorData);
  const dispatch = useDispatch();

  const [{isHover, isDragging}, dropRef ] = useDrop({
    accept: "bun",
    collect: monitor => ({
      isHover: monitor.isOver(),
      isDragging: monitor.canDrop(),
    }),
    drop(item: TIngredient) {
      dispatch(addBun(item));
    }
  });

  let typeText;
  switch(type) {
    case "top":
      typeText = "(верх)";
      break;
    case "bottom":
      typeText = "(низ)";
      break;
  }

  const containerClass = styles.bun + ' ' + (isHover ? styles.hovered : '') + ' ' + (isDragging && !isHover ? styles.dragging : '');

  return (
    <div ref={dropRef} className={containerClass}>
      {
        constructorData.bun === null ?
        (<ConstructorPlaceholder type={type} />)
        :
        (<ConstructorElement type={type} isLocked={true} text={`${constructorData.bun.name} ${typeText}`} price={constructorData.bun.price} thumbnail={constructorData.bun.image} />)
      }
    </div>
  );
};

export default React.memo(BunContainer);
