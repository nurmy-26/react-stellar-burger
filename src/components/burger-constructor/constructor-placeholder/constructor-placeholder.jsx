import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-placeholder.module.css";


function ConstructorPlaceholder(props) {
  let content;
  let wrapper = styles.wrapper

  // type влияет на вид плейсхолдера и текстовое содержание
  if (props.type === 'top') {
    content = 'Выберите булки';
    wrapper += ' ' + styles.top;
  } else if (props.type === 'bottom') {
    content = 'Выберите булки';
    wrapper += ' ' + styles.bottom;
  } else if (props.type === 'center') {
    content = 'Выберите начинку';
    wrapper += ' ' + styles.center;
  } else {
    content = 'Выбран неправильный тип'
  }

  return (
    <div className={wrapper}>
      <p className="text text_type_main-default">{content}</p>
    </div>
  );
};

ConstructorPlaceholder.propTypes = {
  type: PropTypes.string.isRequired
}

export default React.memo(ConstructorPlaceholder);
