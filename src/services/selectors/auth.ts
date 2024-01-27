import { RootState } from "../../utils/types";

export const getAuthChecked = (store: RootState) => store.auth.isAuthChecked;
export const getUser = (store: RootState) => store.auth.user;
