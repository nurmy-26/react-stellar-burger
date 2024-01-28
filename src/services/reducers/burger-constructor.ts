import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  EXCHANGE_ORDER,
  CLEAR_ORDER
} from '../actions/burger-constructor';
import { TConstructorActions } from '../actions/burger-constructor';
import { TIngredient } from '../../utils/types';


type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  totalPrice: number;
};

const constructorInitialState: TConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

export const constructorReducer = (store = constructorInitialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...store,
        bun: action.item,
        totalPrice: store.totalPrice + action.item.price*2 + (store.bun === null ? 0 : -store.bun.price*2)
      };
    }
    case ADD_INGREDIENT:
      // при добавлении ингредиента в конструктор присваиваем ему сгенерированный ключ
      const newItem = {
        ...action.item,
        key: action.key
      }
      return {
        ...store,
        ingredients: [
          ...store.ingredients,
          newItem
        ],
        totalPrice: store.totalPrice + action.item.price
      };
    case DELETE_INGREDIENT:
      return {
        ...store,
        ingredients: store.ingredients.filter(item => item.key !== action.item.key),
        totalPrice: store.totalPrice - action.item.price
    }
    case EXCHANGE_ORDER:
      const newOrder = [...store.ingredients];
      const dragCard = store.ingredients[action.dragIndex];
      // вырезаем из массива перетаскиваемую карточку
      newOrder.splice(action.dragIndex, 1);
      // заменяем карточку, на которую навели курсор, на перетаскиваемую
      newOrder.splice(action.hoverIndex, 0, dragCard);
      return {
        ...store,
        ingredients: newOrder
    }
    case CLEAR_ORDER:
      return {
        ...store,
        bun: null,
        ingredients: [],
        totalPrice: 0
    }
    default: {
      return store;
    }
  }
};
