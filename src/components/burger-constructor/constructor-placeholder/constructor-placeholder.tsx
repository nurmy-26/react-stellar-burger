import React from "react";
import styles from "./constructor-placeholder.module.css";


type Props = {
  type: string;
}

function ConstructorPlaceholder({ type }: Props) {
  let content;
  let wrapper = styles.wrapper

  // type влияет на вид плейсхолдера и текстовое содержание
  if (type === 'top') {
    content = 'Выберите булки';
    wrapper += ' ' + styles.top;
  } else if (type === 'bottom') {
    content = 'Выберите булки';
    wrapper += ' ' + styles.bottom;
  } else if (type === 'center') {
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

export default React.memo(ConstructorPlaceholder);
