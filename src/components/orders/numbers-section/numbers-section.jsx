import React from "react";
import PropTypes from "prop-types";
import styles from "./numbers-section.module.css";


function NumbersSection({ type }) {
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

  // #todo - удалить хардкод
  const orderNumbers = ['034531', '034532', '034533', '034534', '034535', ];
  // const orderNumbers = ['034531', '034532', '034533', '034534', '034535', '034536', '034537', '034538',
  //   '034539', '034540', '034541', '034542', '034543', '034544', '034531', '034532', '034533', '034534',
  //   '034535', '034536', '034537', '034538', '034539', '034540', '034541', '034542', '034543', '034544',
  //   '034539', '034540', '034541', '034542', '034543', '034544', '034531', '034532', '034533', '034534',
  //   '034535', '034536', '034537', '034538', '034539', '034540', '034541', '034542', '034543', '034544']

  // const renderOrders = React.useMemo(() => {
  //   return orderNumbers.map((number, index) => {
  //     return <li key={index}>{number}</li>;
  //   })
  // }, [orderNumbers])

  const renderOrders = () => {
    let columnIndex = 1;
    let rowIndex = 1;

    return orderNumbers.map((order, index) => {
      if (index % 10 === 0 && index !== 0) {
        // переходим к след. колонке при достижении 10 заказов
        columnIndex++;
        rowIndex = 1; // сбрасываем индекс строки
      }

      // задаем позицию в зависимости от индекса элемента
      const itemStyle = {
        gridColumn: columnIndex,
        gridRow: rowIndex,
      };

      rowIndex++; // увеличиваем индекс строки

      // возвращаем элемент списка
      return (
        <li key={index} style={itemStyle}>
          {order}
        </li>
      );
    });
  };


  return (
    <div>
      <h2 className="mb-6 text text_type_main-medium">{text}</h2>
      <ul className={`${styles.list} ${numberStyle}`}>
        {renderOrders()}
      </ul>
    </div>
  );
}

NumbersSection.propTypes = {
  // type: PropTypes.string.isRequired,
}

export default NumbersSection;
