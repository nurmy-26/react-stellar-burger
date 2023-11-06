import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-section.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../../modal/modal";
import IngredientDetails from "./../ingredient-details/ingredient-details";
import { useModal } from "../../../hooks/useModal"; // импорт кастомного хука
import { useSelector, useDispatch } from "react-redux";
import { addBun, addIngredient } from "../../../services/actions/burger-constructor";
import { getIngredientsList } from "../../../services/selectors/ingredients";
import { setIngredientInfo, resetIngredientInfo } from "../../../services/actions/details"


// memo - чтобы секция не перерисовывалась лишний раз
const IngredientSection = React.forwardRef(({type}, ref) => {
  const ingredientsList = useSelector(getIngredientsList);
  const dispatch = useDispatch();

  // деструктуризуем кастомный хук для управления модальным окном
  const { isModalOpen, openModal, closeModal } = useModal();

  // при открытии модалки записываем инфо об ингредиенте в store (и добавляем его в конструктор)
  const openTooltip = (el) => {
    dispatch(setIngredientInfo(el));
    openModal();
    // el.type === "bun" ? dispatch(addBun(el)) : dispatch(addIngredient(el));
  }

  // при закрытии модалки сбрасываем инфо об ингредиенте в store
  const closeTooltip = () => {
    closeModal();
    dispatch(resetIngredientInfo());
  }

  // возвращаем результат фильтрации ingredientsList (со всеми элементами для секции конкретного типа)
  const filteredList = React.useMemo(() => {
    return ingredientsList.filter(item => item.type === type);
  }, [ingredientsList]);
  // useMemo в обоих случаях - чтобы не было лишних рендеров
  const section = React.useMemo(() => {
    return filteredList.map((item) => {
      return <IngredientCard onOpen={() => openTooltip(item)} itemInfo={item} key={item._id} />;
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

      {
        isModalOpen &&
        <Modal header="Детали ингредиента" onClose={closeTooltip}>
          <IngredientDetails />
        </Modal>
      }
    </section>
  );
})

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired
}

export default IngredientSection;
