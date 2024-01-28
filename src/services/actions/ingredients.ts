import { getIngredients } from '../../utils/api';
import { AppDispatch, AppThunk, TIngredient } from '../../utils/types';


export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export type TGetIngredientsAction = {
  readonly type: typeof GET_INGREDIENTS;
};
export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];

};
export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions = TGetIngredientsAction | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;


export const requestIngredientsData: AppThunk = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    });
    getIngredients().then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
      console.log(err)
    })
  }
}
