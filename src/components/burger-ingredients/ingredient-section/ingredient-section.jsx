import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ingredient-section.module.css";
import { getIngredientsList } from "../../../services/selectors/ingredients";
import IngredientCard from "../ingredient-card/ingredient-card";


// memo - чтобы секция не перерисовывалась лишний раз
const IngredientSection = React.forwardRef(({type}, ref) => {
  const ingredientsList = useSelector(getIngredientsList);

  // возвращаем результат фильтрации ingredientsList (со всеми элементами для секции конкретного типа)
  const filteredList = React.useMemo(() => {
    return ingredientsList.filter(item => item.type === type);
  }, [ingredientsList]);

  const MemoIngredientCard = React.memo(IngredientCard)
  // useMemo в обоих случаях - чтобы не было лишних рендеров
  const section = React.useMemo(() => {
    return filteredList.map((item) => {
      return <MemoIngredientCard itemInfo={item} key={item._id} />;
    })
  }, [filteredList])


  // устанавливаем название секции в зависимости от типа ингредиентов
  let sectionTitle;
  let sectionClass;
  switch (type) {
    case "bun":
      sectionTitle = "Булки";
      sectionClass = 'bun';
      break;
    case "sauce":
      sectionTitle = "Соусы";
      sectionClass = 'sauce';
      break;
    case "main":
      sectionTitle = "Начинки";
      sectionClass = 'main';
      break;
  }


  return (
    <section className={sectionClass}>
      <h2 ref={ref} className={styles.title}>{sectionTitle}</h2>
      <ul className={styles.list}>
        {section}
      </ul>
    </section>
  );
})

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired
}

export default IngredientSection;
