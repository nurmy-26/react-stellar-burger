import { getCookie, setCookie } from "./cookie";
import { TEmail, TPassword, TName, TToken, TOptions, TResponseBody } from './types';

export const CONFIG = {
  ROUTES: {
    BASE_URL: 'https://norma.nomoreparties.space/api/',
    WS_ALL: 'wss://norma.nomoreparties.space/orders/all',
    WS_AUTH: 'wss://norma.nomoreparties.space/orders'
  },
  ENDPOINTS: {
    INGREDIENTS_ENDPOINT: 'ingredients',
    ORDERS_ENDPOINT: 'orders',
    REGISTER_ENDPOINT: 'auth/register',
    LOGIN_ENDPOINT: 'auth/login',
    USER_ENDPOINT: 'auth/user',
    LOGOUT_ENDPOINT: 'auth/logout',
    TOKEN_ENDPOINT: 'auth/token',
    PASSWORD_RESET_ENDPOINT: 'password-reset',
    PASSWORD_UPDATE_ENDPOINT: 'password-reset/reset',
    GET_ORDER_INFO: 'orders/ '
  },
  HEADERS: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}


// универсальная ф-я проверки ответа от сервера
export const checkResponse = (res: Response): Promise<TResponseBody> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

// универсальная ф-я проверки на success от сервера
export const checkSuccess = (res: TResponseBody) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Статус success: ${res.success}`);
}

// универсальная ф-я для запроса с проверкой ответа (url вместо endpoint - если нужны будут разные сервера)
export const request = (endpoint: string, options: TOptions) => {
  return fetch(`${CONFIG.ROUTES.BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
}

// ф-я обновления токена для запросов, требущих авторизации
export const updateToken = () => {
  return request(CONFIG.ENDPOINTS.TOKEN_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
  .then(refreshData => {
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    setCookie('refreshToken', refreshData.refreshToken);
    setCookie('token', refreshData.accessToken.split("Bearer ")[1]);
    return Promise.resolve();
  })
}

// ф-я для выполнения и проверки запросов, требующих авторизации
export const authorizedRequest = (endpoint: string, options: TOptions) => {
  return request(endpoint, options)
    .catch((err) => {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        return updateToken().then(() => {
          const updatedOptions = {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${getCookie('token')}`
            }
          };
          return request(endpoint, updatedOptions);
        });
      } else {
        return Promise.reject(err);
      }
  });
}

// получение data ингредиентов с сервера
export const getIngredients = () => {
  return request(CONFIG.ENDPOINTS.INGREDIENTS_ENDPOINT, {
    headers: CONFIG.HEADERS,
  })
}

// отправка данных о заказе на сервер (теперь с авторизацией)
export const postOrder = (arr: string[]) => {
  return authorizedRequest(CONFIG.ENDPOINTS.ORDERS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      ingredients: arr,
    })
  })
}


// регистрация пользователя
export const registerRequest = (form: TEmail & TPassword & TName) => {
  return request(CONFIG.ENDPOINTS.REGISTER_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name
    })
  })
}

// залогиниться
export const loginRequest = (form: TEmail & TPassword) => {
  return request(CONFIG.ENDPOINTS.LOGIN_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      email: form.email,
      password: form.password
    })
  })
}

// разлогиниться
export const logoutRequest = () => {
  return request(CONFIG.ENDPOINTS.LOGOUT_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}

// сбросить пароль
export const resetPassword = (form: TEmail) => {
  return request(CONFIG.ENDPOINTS.PASSWORD_RESET_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      email: form.email
    })
  })
}

// восстановить пароль
export const updatePassword = (form: TPassword & TToken) => {
  return request(CONFIG.ENDPOINTS.PASSWORD_UPDATE_ENDPOINT, {
    method: 'POST',
    headers: CONFIG.HEADERS,
    body: JSON.stringify({
      password: form.password,
      token: form.token
    })
  })
}

// получение данных пользователя с сервера
export const getUserInfo = () => {
  return authorizedRequest(CONFIG.ENDPOINTS.USER_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
}

// обновление данных пользователя с сервера
export const updateUserInfo = (form: TEmail & TPassword & TName) => {
  return authorizedRequest(CONFIG.ENDPOINTS.USER_ENDPOINT, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name
    })
  })
}

// получение данных об открытом заказе
export const getOrderInfo = (number: number) => {
  return request(`${CONFIG.ENDPOINTS.GET_ORDER_INFO}${number}`, {
    method: 'GET',
    headers: CONFIG.HEADERS
  })
}
