import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';
import { TIngredientsActions } from '../actions/ingredients';
import { TIngredient } from '../../utils/types';


type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false
};

export const ingredientsReducer = (store = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
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
