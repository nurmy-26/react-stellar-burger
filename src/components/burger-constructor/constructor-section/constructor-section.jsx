import React from "react";
import styles from "./constructor-section.module.css";
import ConstructorItem from "../constructor-item/constructor-item";
import ConstructorPlaceholder from "./../constructor-placeholder/constructor-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getConstructorData } from "../../../services/selectors/burger-constructor";
import { addIngredient } from "../../../services/actions/burger-constructor";
import { v4 as uuidv4 } from 'uuid'; // библиотека для генерации случайного id


// memo - чтобы секция реже рендерилась
const ConstructorSection = React.memo(() => {
  const constructorData = useSelector(getConstructorData);
  const dispatch = useDispatch();

  const [{isHover, isDragging}, dropRef ] = useDrop({
    // accept: ["sauce", "main"],
    accept: "sauce",
    collect: monitor => ({
      isHover: monitor.isOver(),
      isDragging: monitor.canDrop(),
    }),
    drop(item) {
      dispatch(addIngredient(item));

      console.log(item.key);
      console.log(constructorData["ingredients"]);
    }
  });

  // constructorData["ingredients"] - список ингредиентов в заказе, формирующийся по клику (потом - dnd)
  const section = React.useMemo(() => {
    return constructorData["ingredients"].map((item) => {
      return <ConstructorItem item={item} key={item.key} />;
    })
  }, [constructorData])

  return (
    <ul ref={dropRef} className={styles.wrapper}>
      {
        // constructorData.ingredients.length > 0 ?
        // {section}
        // :
        (<ConstructorPlaceholder type="center" />)
      }
    </ul>
  );
});

export default ConstructorSection;
