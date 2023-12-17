import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { getIngredientsData, getIngredientsList } from "../../../services/selectors/ingredients";
import Loading from "../../../components/common/loading/loading";


function IngredientDetails() {
  // извлекаем параметр из url (должен в точности совпадать с частью ":id")
  const { id } = useParams();
  const ingredientList = useSelector(getIngredientsList);
  const ingredientsData = useSelector(getIngredientsData);

  // находим ингредиент, совпадающий по id с id из url (= открытый)
  const detailsData = ingredientList.find(item => item._id === id)

  const { isLoading, hasError } = ingredientsData;

  return (
    <>
      {isLoading && <Loading type='loadingPoints'>Отправляем ваш заказ...</Loading>}
      {hasError && <p>Ой! Что-то пошло не так...</p>}
      {detailsData && !isLoading && !hasError && (
        <div className={styles.details}>
        <img className={styles.img} src={detailsData.image_large} alt={detailsData.name} />
        <h3 className={styles.name}>{detailsData.name}</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <h4 className={styles.category}>Калории,ккал</h4>
            <p className={styles.number}>{detailsData.calories}</p>
          </li>
          <li className={styles.item}>
            <h4 className={styles.category}>Белки, г</h4>
            <p className={styles.number}>{detailsData.proteins}</p>
          </li>
          <li className={styles.item}>
            <h4 className={styles.category}>Жиры, г</h4>
            <p className={styles.number}>{detailsData.fat}</p>
          </li>
          <li className={styles.item}>
            <h4 className={styles.category}>Углеводы, г</h4>
            <p className={styles.number}>{detailsData.carbohydrates}</p>
          </li>
        </ul>
      </div>
      )}
    </>
  )

};

export default IngredientDetails;
