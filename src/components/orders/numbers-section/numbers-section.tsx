import React from "react";
import styles from "./numbers-section.module.css";
import { getNumbersGridOrder } from "../../../utils/helpers";


type Props = {
  orderNumbers: number[];
  type: string;
}

function NumbersSection({ orderNumbers, type }: Props) {
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
    getNumbersGridOrder(orderNumbers),
  [orderNumbers]);

  const content = React.useMemo(() =>
    numbersList.map((item, index) => {
      return <li key={index} style={item.style}>{item.order}</li>
  }),
  [numbersList]);

  // горизонтальный скролл
  const containerRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const handleWheel = (event: WheelEvent) => {
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
        {/* список номеров заказов */}
        {content}
      </ul>
    </div>
  );
}

export default React.memo(NumbersSection);
