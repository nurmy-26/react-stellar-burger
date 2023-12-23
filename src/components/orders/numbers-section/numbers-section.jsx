import React from "react";
import PropTypes from "prop-types";
import styles from "./numbers-section.module.css";
import { renderOrderNumbers } from "../../../utils/helpers";


function NumbersSection({ orderNumbers, type }) {
  // текст заголовка и цвет цифр зависят от type
  let text;
  let numberStyle;
  switch(type) {
    case "done":
      text = "Готовы:";
      numberStyle = styles.done;
      break;
    case "in-work":
      text = "В работе:";
      numberStyle = styles.inWork;
      break;
  }

  // получаем список номеров
  const numbersList = React.useMemo(() =>
    renderOrderNumbers(orderNumbers),
  [orderNumbers]);

  // горизонтальный скролл
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const handleWheel = (event) => {
      event.preventDefault();
      if(container){
        container.scrollLeft += event.deltaY;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);


  return (
    <div>
      <h2 className="mb-6 text text_type_main-medium">{text}</h2>
      <ul ref={containerRef} className={`${styles.list} ${numberStyle}`}>
        {numbersList}
      </ul>
    </div>
  );
}

NumbersSection.propTypes = {
  orderNumbers: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.string.isRequired
}

export default React.memo(NumbersSection);
