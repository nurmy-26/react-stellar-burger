import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from "../../../utils/prop-types";
import { deleteIngredient } from "../../../services/actions/burger-constructor";
import { exchangeOrder } from "../../../services/actions/burger-constructor";


// на вход - объект из data
function ConstructorItem({item, index}) {
  const {name, price, image} = item;
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [{isDragging}, draggableRef ] = useDrag({
    type: "order",
    item: {...item, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [{isHover}, dropRef ] = useDrop({
    accept: "order",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    hover(item, monitor) {
      // если ref не успел привязаться - return
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index; // индекс элемента
      const hoverIndex = index; // индекс из пропсов

      // если элемент зависает над своим местом - return
      if (dragIndex === hoverIndex) {
        return;
      }

      // константы, необходимые для вычисления позиций курсора и границ элемента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // если двигаем элемент сверху вниз и курсор еще не дошел до середины карточки - return
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // аналогично для движения снизу вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // только если ни одно из условий выше не сработало - меняем порядок
      dispatch(exchangeOrder(dragIndex, hoverIndex));
      item.index = hoverIndex;
    }
  });

  const handleDelete = (item) => {
    dispatch(deleteIngredient(item));
  }

  draggableRef(dropRef(ref)); // чтобы привязать ref одновременно и к drag, и к drop

    // стили для визуализации перетаскивания
    let itemClass = styles.item + ' ' + (isHover ? styles.hovered : '')
    // + ' ' + (isDragging && !isHover ? styles.dragging : '');

  return (
    <li ref={ref} className={itemClass}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={image} handleClose={() => handleDelete(item)} />
    </li>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropType,
  index: PropTypes.number.isRequired
}

export default React.memo(ConstructorItem);
