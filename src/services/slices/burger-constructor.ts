import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types';

interface TConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  totalPrice: number;
}

const constructorInitialState: TConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

const constructorSlice = createSlice({
  name: 'constructorData',
  initialState: constructorInitialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
      state.totalPrice += action.payload.price * 2 + (state.bun === null ? 0 : -state.bun.price * 2);
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newItem = {
        ...action.payload,
        key: uuidv4()
      };
      state.ingredients.push(newItem);
      state.totalPrice += action.payload.price;
    },
    deleteIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(item => item.key !== action.payload.key);
      state.totalPrice -= action.payload.price;
    },
    exchangeOrder: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newOrder = [...state.ingredients];
      const dragCard = state.ingredients[dragIndex];
      newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragCard);
      state.ingredients = newOrder;
    },
    clearOrder: state => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    }
  }
});

export type TConstructorActions =
  | ReturnType<typeof addBun>
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof deleteIngredient>
  | ReturnType<typeof exchangeOrder>
  | ReturnType<typeof clearOrder>;

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  exchangeOrder,
  clearOrder
} = constructorSlice.actions;

export default constructorSlice.reducer;
