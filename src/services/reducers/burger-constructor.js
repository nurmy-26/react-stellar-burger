import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT
} from '../actions/burger-constructor';

const constructorInitialState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

export const constructorReducer = (store = constructorInitialState, action) => {
  switch (action.type) {
    // булку можно выбрать 1 раз (если уже выбрана, то ничего не происходит)
    case ADD_BUN: {
      return {
        ...store,
        // если булки еще нет - добавится перетаскиваемая, иначе - останется старая (т.к. булка заблокирована)
        bun: store.bun === null ? action.item : store.bun,
        totalPrice: store.totalPrice + (store.bun === null ? (action.item.price*2) : 0)
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
    default: {
      return store;
    }
  }
};
