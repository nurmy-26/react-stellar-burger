import { v4 as uuidv4 } from 'uuid'; // библиотека для генерации случайного id


export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// генератор экшена для типа 'ADD_BUN'
export const addBun = (item) => {
  return {
    type: ADD_BUN,
    item: item
  }
}

// генератор экшена для типа 'ADD_INGREDIENT'
export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
    key: uuidv4(), // генерируем случайный id для key
    item: item
  }
}
