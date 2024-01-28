import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../services/store';
import { TAuthActions } from "../services/actions/auth";
import { TConstructorActions } from "../services/actions/burger-constructor";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";
import { TWebSocketActions } from "../services/actions/web-socket";


// типизация store
export type RootState = ReturnType<typeof store.getState>;

// типизация всех экшенов приложения
type TApplicationActions = TAuthActions | TConstructorActions | TIngredientsActions | TOrderActions | TWebSocketActions;

// типизация thunk в приложении; TReturn = Promise<void> | void
// по умолчанию AppThunk<void>
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// типизация метода dispatch для проверки на валидность отправляемого экшена
// подставляем в AppThunk<Promise<void>> вместо void
// export type AppDispatch = ThunkDispatch<RootState, undefined, TApplicationActions>;
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = Dispatch<TApplicationActions>;


export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  key?: string;
  image_large?: string;
  calories?: string;
  proteins?: string;
  fat?: string;
  carbohydrates?: string;
}

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export type TUser = {
  email: string;
  name: string;
}

export type TEmail = {
  email?: string;
}
export type TPassword = {
  password?: string;
}
export type TName = {
  name?: string;
}

export type TSuccess = {
  success: boolean;
}

export type TToken = {
  token?: string;
}

export type TTokens = {
  accessToken: string;
  refreshToken: string;
}

export type TOptions = {
  method?: string;
  headers?: {
    'Content-Type'?: string;
    'Authorization'?: string;
  };
  body?: BodyInit;
}

// Тела ответов сервера:
export type TIngredientsResponse = TSuccess & {
  data: TIngredient[];
}

export type TOrderResponse = TSuccess & TName & {
  order: TOrder;
}
export type TOrdersResponse = TSuccess & TOrders;

export type TUserResponse = TSuccess & TUser;

export type TRegistrationResponse = TSuccess & TUser & TTokens;
export type TAuthorizationResponse = TRegistrationResponse;
export type TRefreshTokenResponse = TSuccess & TTokens;
export type TLogoutResponse = TSuccess & {
  message: string;
};

// export interface CustomResponse<T> extends Body {
//   readonly success?: boolean;
//   readonly headers: Headers;
//   readonly ok: boolean;
//   readonly redirected: boolean;
//   readonly status: number;
//   readonly statusText: string;
//   // readonly trailer: Promise<Headers>;
//   accessToken?: string;
//   refreshToken?: string;
//   readonly type: ResponseType;
//   readonly url: string;
//   clone(): Response;
//   json(): Promise<T>; // сюда попадет то, что в CustomResponse<...>
// }

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  readonly data: TIngredient[];
  readonly user: TUser;
  readonly order: TOrder;
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
  readonly message: string;
  readonly accessToken: string;
  readonly refreshToken: string;
};
