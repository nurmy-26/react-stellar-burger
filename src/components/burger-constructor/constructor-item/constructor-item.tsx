import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../../hooks/redux-hooks";
import styles from "./constructor-item.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../../utils/types";
import { deleteIngredient } from "../../../services/actions/burger-constructor";
import { exchangeOrder } from "../../../services/actions/burger-constructor";


type Props = {
  item: TIngredient;
  index: number;
}

// на вход - объект из data
function ConstructorItem({ item, index }: Props) {
  const {name, price, image} = item;
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLLIElement>(null);

  const [{isDragging}, draggableRef, dragPreview ] = useDrag({
    type: "order",
    item: {...item, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef ] = useDrop({
    accept: "order",
    hover(item: {index: number}, monitor) {
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
      const hoverMiddleY = (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect!.top;

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

  const handleDelete = (item: TIngredient) => {
    dispatch(deleteIngredient(item));
  }

  dragPreview(dropRef(ref)); // чтобы привязать ref одновременно и к dragPreview, и к drop

  // стили для визуализации перетаскивания
  const itemClass = styles.item + ' ' + (isDragging ? styles.dragging : '');

  return (
    <li ref={ref} className={itemClass}>
      <span ref={draggableRef} className={styles.dragIcon}><DragIcon type="primary" /></span>
      <ConstructorElement text={name} price={price} thumbnail={image} handleClose={() => handleDelete(item)} />
    </li>
  );
};

export default React.memo(ConstructorItem);
