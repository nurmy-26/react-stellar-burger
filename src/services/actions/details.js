export const SET_INGREDIENT_INFO = 'SET_INGREDIENT_INFO';
export const RESET_INGREDIENT_INFO = 'RESET_INGREDIENT_INFO';

// генератор экшена для типа 'SET_INGREDIENT_INFO'
export const setIngredientInfo = (item) => {
  return {
    type: SET_INGREDIENT_INFO,
    item: item
  }
}

// генератор экшена для типа 'RESET_INGREDIENT_INFO'
export const resetIngredientInfo = () => {
  return {
    type: RESET_INGREDIENT_INFO
  }
}
