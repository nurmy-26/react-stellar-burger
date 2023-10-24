import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-section.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../../modal/modal";
import IngredientDetails from "./../ingredient-details/ingredient-details";
import {ingredientPropType} from "../../../utils/prop-types";
import { useModal } from "../../../hooks/useModal"; // импорт кастомного хука
import { ConstructorContext } from "../../../services/orderContext";


// memo - чтобы секция не перерисовывалась лишний раз
const IngredientSection = React.forwardRef(({data, type}, ref) => {

  // достаем из контекста деструктуризуемые данные
  const {constructorState, orderDispatcher} = React.useContext(ConstructorContext)

  // деструктуризуем кастомный хук для управления модальным окном
  const { isModalOpen, openModal, closeModal } = useModal();

  // state для информации об ингредиенте
  const [info, setInfo] = React.useState({});

  const openTooltip = (el) => {
    setInfo(el);
    openModal();
    // при клике на булку она заменится; на ингредиент - добавится в массив заказа (временно -> будет dnd)
    el.type === "bun" ?
    orderDispatcher({type: 'BUN', payload: el})
    :
    orderDispatcher({type: 'NO-BUN', payload: el})
  }

  const closeTooltip = () => {
    closeModal();
  }

  // возвращаем результат фильтрации data
  const filteredList = React.useMemo(() => {
    return data.filter(item => item.type === type);
  }, [data]);
  // useMemo в обоих случаях - чтобы не было лишних рендеров
  const section = React.useMemo(() => {
    return filteredList.map((item) => {
      return <IngredientCard onOpen={() => openTooltip(item)} itemInfo={item} key={item._id} />;
    })
  }, [filteredList])


  // устанавливаем название секции в зависимости от типа ингредиентов
  let sectionTitle;
  switch (type) {
    case "bun":
      sectionTitle = "Булки";
      break;
    case "main":
      sectionTitle = "Начинки";
      break;
    case "sauce":
      sectionTitle = "Соусы";
      break;
  }


  return (
    <section>
      <h2 ref={ref} className={styles.title}>{sectionTitle}</h2>
      <ul className={styles.list}>
        {section}
      </ul>

      {
        isModalOpen &&
        <Modal header="Детали ингредиента" onClose={closeTooltip}>
          <IngredientDetails cardInfo={info} />
        </Modal>
      }
    </section>
  );
})

IngredientSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  type: PropTypes.string.isRequired
}

export default IngredientSection;
