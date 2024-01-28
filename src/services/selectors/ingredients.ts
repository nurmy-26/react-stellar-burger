import { RootState } from "../../utils/types";

export const getIngredientsData = (store: RootState) => store.ingredientsData;
export const getIngredientsList = (store: RootState) => store.ingredientsData.ingredients;
