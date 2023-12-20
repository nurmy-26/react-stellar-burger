import { getCookie, setCookie } from "./cookie";

export const config = {
  BASE_URL: 'https://norma.nomoreparties.space/api/',
  INGREDIENTS_ENDPOINT: 'ingredients',
  ORDERS_ENDPOINT: 'orders',

  REGISTER_ENDPOINT: 'auth/register',
  LOGIN_ENDPOINT: 'auth/login',
  USER_ENDPOINT: 'auth/user',
  LOGOUT_ENDPOINT: 'auth/logout',
  TOKEN_ENDPOINT: 'auth/token',
  PASSWORD_RESET_ENDPOINT: 'password-reset',
  PASSWORD_UPDATE_ENDPOINT: 'password-reset/reset',

  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}


// универсальная ф-я проверки ответа от сервера
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

// универсальная ф-я проверки ответа от сервера для запросов, требущих авторизации
// (для позднейшего получения message из error)
export const checkAuthResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

// универсальная ф-я проверки на success от сервера
export const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Статус success: ${res.success}`);
}

// универсальная ф-я для запроса с проверкой ответа (url вместо endpoint - если нужны будут разные сервера)
export const request = (endpoint, options) => {
  return fetch(`${config.BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
}

// ф-я обновления токена для запросов, требущих авторизации
export const updateToken = () => {
  return request(config.TOKEN_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}

// ф-я для выполнения и проверки запросов, требующих авторизации
export const authorizedRequest = (endpoint, options) => {
  return request(endpoint, options)
    .catch((err) => {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        return updateToken()
          .then(refreshData => {
            if (!refreshData.success) {
              return Promise.reject(refreshData);
            }
            setCookie('refreshToken', refreshData.refreshToken);
            setCookie('token', refreshData.accessToken.split("Bearer ")[1], { expires: 1200 });

            const updatedOptions = {
              ...options,
              headers: {
                ...options.headers,
                'Authorization': refreshData.accessToken
              }
            };

            return fetch(`${config.BASE_URL}${endpoint}`, updatedOptions);
          })
          .then(checkResponse);
      } else {
        return Promise.reject(err);
      }
  });
}

// получение data ингредиентов с сервера
export const getIngredients = () => {
  return request(config.INGREDIENTS_ENDPOINT, {
    headers: config.headers,
  })
}

// отправка данных о заказе на сервер
export const postOrder = (arr) => {
  return request(config.ORDERS_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      ingredients: arr,
    })
  })
}


// регистрация пользователя
export const registerRequest = (form) => {
  return request(config.REGISTER_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name
    })
  })
}

// залогиниться
export const loginRequest = (form) => {
  return request(config.LOGIN_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: form.email,
      password: form.password
    })
  })
}

// разлогиниться
export const logoutRequest = () => {
  return request(config.LOGOUT_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}

// сбросить пароль
export const resetPassword = (form) => {
  return request(config.PASSWORD_RESET_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: form.email
    })
  })
}

// восстановить пароль
export const updatePassword = (form) => {
  return request(config.PASSWORD_UPDATE_ENDPOINT, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      password: form.password,
      token: form.token
    })
  })
}

// получение данных пользователя с сервера
export const getUserInfo = () => {
  return authorizedRequest(config.USER_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
}

// обновление данных пользователя с сервера
export const updateUserInfo = (form) => {
  return authorizedRequest(config.USER_ENDPOINT, {
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
