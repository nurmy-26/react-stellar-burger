import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export const orderPropType = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
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

export type TUser = {
  email: string;
  name: string;
}

export type TEmail = {
  email: string;
}
export type TPassword = {
  password: string;
}
export type TName = {
  name: string;
}

export type TSuccess = {
  success: boolean;
}

export type TToken = {
  token: string;
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

export type TIngredientsData = TSuccess & {
  data: TIngredient[];
}

export type TOrderData = TSuccess & TName & {
  order: TOrder;
}

export type TOrdersData = TSuccess & {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export type TUserData = TSuccess & TUser;

export type TRegistrationData = TSuccess & TUser & TTokens;
export type TAuthorizationData = TRegistrationData;
export type TRefreshTokenData = TSuccess & TTokens;
export type TLogoutData = TSuccess & {
  message: string;
};

export type TResponseBody = TIngredientsData | TOrderData | TOrdersData | TUserData |
  TRegistrationData | TAuthorizationData | TRefreshTokenData | TLogoutData;

export interface CustomResponse<T> extends Body {
  readonly success?: boolean;
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  // readonly trailer: Promise<Headers>;
  accessToken?: any;
  refreshToken?: any;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): Promise<T>;
}
