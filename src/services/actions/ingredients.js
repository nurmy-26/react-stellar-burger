import { getIngredients } from '../../utils/api';


export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function requestIngredientsData() {
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
