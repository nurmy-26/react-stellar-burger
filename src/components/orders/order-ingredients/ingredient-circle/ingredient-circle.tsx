import React, { ElementType } from "react";
import { useSelector } from "../../../../hooks/redux-hooks";
import styles from "./ingredient-circle.module.css";
import { findItem } from "../../../../utils/helpers";
import { getIngredientsList } from "../../../../services/selectors/ingredients";


type Props = {
  itemId: string;
  style?: {
    left: number;
    zIndex: number;
  };
  tag?: ElementType | string;
}

function IngredientCircle({ itemId, style, tag='div' }: Props) {
  const Tag: ElementType | string = tag;
  const ingredientList = useSelector(getIngredientsList);
  // находим ингредиент по переданному id
  const detailsData = React.useMemo(() =>
    findItem(ingredientList, itemId),
  [ingredientList]);

  return (
    <Tag className={styles.circleBack} style={style}>
      <div className={styles.circleFront}>
        { detailsData &&
          <img className={styles.img} src={detailsData.image} alt={detailsData.name} />}
      </div>
    </Tag>
  );
}

export default IngredientCircle;
