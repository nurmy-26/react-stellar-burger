import React from "react";
import PropTypes from "prop-types";
import styles from "./bun-container.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import ConstructorPlaceholder from "./../constructor-placeholder/constructor-placeholder";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBun } from "../../../services/actions/burger-constructor";


function BunContainer({type}) {
  const constructorData = useSelector(getConstructorData);
  const dispatch = useDispatch();

  const [{isHover, isDragging}, dropRef ] = useDrop({
    accept: "bun",
    collect: monitor => ({
      isHover: monitor.isOver(),
      isDragging: monitor.canDrop(),
    }),
    drop(item) {
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

  let containerClass = styles.bun
  // если в контейнере уже есть булка, то перетащить новую нельзя; если нет - применятся стили для "подсветки" целевого элемента
  if (constructorData.bun === null) {
    containerClass = styles.bun + ' ' + (isHover ? styles.hovered : '') + ' ' + (isDragging && !isHover ? styles.dragging : '')
  }

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

BunContainer.propTypes = {
  type: PropTypes.string.isRequired
  }

export default React.memo(BunContainer);
