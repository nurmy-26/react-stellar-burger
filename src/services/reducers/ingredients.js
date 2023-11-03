import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';


const ingredientsInitialState = {
  ingredients: [],
  isLoading: false,
  hasError: false
};

export const ingredientsReducer = (store = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...store,
        isLoading: true,
        hasError: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...store,
        ingredients: action.ingredients,
        isLoading: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...store,
        isLoading: false,
        hasError: true
      };
    }
    default: {
      return store;
    }
  }
};
