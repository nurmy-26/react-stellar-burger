import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/types';
import { getIngredients } from '../../utils/api';


type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
};

// генератор асинхронного экшена (в зависимости от результата диспатчатся соотв-е экшены)
export const fetchIngredients = createAsyncThunk('ingredientsData/fetchIngredients', async () => {
  const response = await getIngredients();
  return response.data;
});

// слайс
const ingredientsSlice = createSlice({
  name: 'ingredientsData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export type TIngredientsActions =
  | ReturnType<typeof fetchIngredients.pending>
  | ReturnType<typeof fetchIngredients.fulfilled>
  | ReturnType<typeof fetchIngredients.rejected>;

export default ingredientsSlice.reducer
