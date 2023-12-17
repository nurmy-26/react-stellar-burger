import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  // имена полей = имена под-объектов общего store
  // например, store.ingredientsData.ingredients - доступ к списку ингредиентов
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  orderDetails: orderReducer,
  auth: authReducer
});
