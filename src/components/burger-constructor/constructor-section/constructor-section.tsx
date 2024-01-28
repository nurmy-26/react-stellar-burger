import React from "react";
import { useDispatch, useSelector } from "../../../hooks/redux-hooks";
import { useDrop } from "react-dnd";
import styles from "./constructor-section.module.css";
import {TIngredient} from "../../../utils/types";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import { addIngredient } from "../../../services/actions/burger-constructor";
import ConstructorItem from "../constructor-item/constructor-item";
import ConstructorPlaceholder from "../constructor-placeholder/constructor-placeholder";


// memo - чтобы секция реже рендерилась
const ConstructorSection = React.memo(() => {
  const constructorData = useSelector(getConstructorData);
  const dispatch = useDispatch();

  const [{isHover, isDragging}, dropRef ] = useDrop({
    accept: ["sauce", "main"],
    collect: monitor => ({
      isHover: monitor.isOver(),
      isDragging: monitor.canDrop(),
    }),
    drop(item: TIngredient) {
      dispatch(addIngredient(item));
    }
  });

  // constructorData["ingredients"] - список ингредиентов в заказе, формирующийся по dnd
  const section = React.useMemo(() => {
    return constructorData["ingredients"].map((item, index) => {
      return <ConstructorItem index={index} item={item} key={item.key} />;
    })
  }, [constructorData])

  // стили для визуализации перетаскивания
  let containerClass = styles.wrapper + ' ' + (isHover ? styles.hovered : '') + ' ' + (isDragging && !isHover ? styles.dragging : '');

  return (
    <ul ref={dropRef} className={containerClass}>
      {
        constructorData.ingredients.length > 0 ?
        section
        :
        (<ConstructorPlaceholder type="center" />)
      }
    </ul>
  );
});

export default ConstructorSection;
