// import { useReducer } from "react";

export const orderReducer = (prevState, action) => {
  let sum;
  let array;
  switch (action.type) {

    case 'BUN':
      // при нажатии на булку вычитаем стоимость старых булок и прибавляем стоимость новых
      sum = prevState.total - prevState.bun.price*2 + action.payload.price*2;
      return {
        ...prevState,
        bun: action.payload,
        total: sum
      };

    case 'NO-BUN':
      sum = prevState.total + action.payload.price;
      array = [...prevState.ingredients];
      array.push(action.payload);
      return {
        ...prevState,
        ingredients: array,
        total: sum
      };

    default:
      throw new Error(`Неверный тип action: ${action.type}`);
  }
};
