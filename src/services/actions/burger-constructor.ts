import { v4 as uuidv4 } from 'uuid'; // библиотека для генерации случайного id
import { TIngredient } from '../../utils/types';


export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EXCHANGE_ORDER = 'EXCHANGE_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export type TAddBunAction = {
  readonly type: typeof ADD_BUN;
  readonly item: TIngredient;
};
export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly key: string;
  readonly item: TIngredient;

};
export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly item: TIngredient;
};
export type TExchangeOrderAction = {
  readonly type: typeof EXCHANGE_ORDER;
  readonly dragIndex: number;
  readonly hoverIndex: number;
};
export type TClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
};

export type TConstructorActions = TAddBunAction | TAddIngredientAction | TDeleteIngredientAction |
TExchangeOrderAction | TClearOrderAction;


// генератор экшена для типа 'ADD_BUN'
export const addBun = (item: TIngredient): TAddBunAction => {
  return {
    type: ADD_BUN,
    item: item
  }
}

// генератор экшена для типа 'ADD_INGREDIENT'
export const addIngredient = (item: TIngredient): TAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    key: uuidv4(), // генерируем случайный id для key
    item: item
  }
}

// генератор экшена для типа 'DELETE_INGREDIENT'
export const deleteIngredient = (item: TIngredient): TDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    item: item
  }
}

// генератор экшена для типа 'EXCHANGE_ORDER'
export const exchangeOrder = (dragIndex: number, hoverIndex: number): TExchangeOrderAction => {
  return {
    type: EXCHANGE_ORDER,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}

// генератор экшена для типа 'CLEAR_ORDER'
export const clearOrder = (): TClearOrderAction => {
  return {
    type: CLEAR_ORDER
  }
}
