import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './web-socket';


export const rootReducer = combineReducers({
  // имена полей = имена под-объектов общего store
  // например, store.ingredientsData.ingredients - доступ к списку ингредиентов
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  orderData: orderReducer,
  auth: authReducer,
  socket: wsReducer
});
