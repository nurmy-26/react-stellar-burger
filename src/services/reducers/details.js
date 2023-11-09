import {
  SET_INGREDIENT_INFO,
  RESET_INGREDIENT_INFO
} from '../actions/details';

const detailsInitialState = {
  _id: '',
  name: '',
  type: '',
  calories: null,
  proteins: null,
  fat: null,
  carbohydrates: null,
  price: null,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: null
};

export const detailsReducer = (store = detailsInitialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_INFO: {
      return {
        ...store,
        ...action.item // записываем информацию об ингредиенте
      };
    }
    case RESET_INGREDIENT_INFO:
      return {
        ...store,
        ...detailsInitialState // сбрасываем до начального состояния
      };
    default: {
      return store;
    }
  }
};
