export const config = {
  BASE_URL: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

// универсальная ф-я проверки ответа от сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
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


// получение data ингредиентов с сервера
export const getIngredients = () => {
  return request('ingredients', {
    headers: config.headers
  })
}

// отправка данных на сервер
export const postOrder = (arr) => {
  return request('orders', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      ingredients: arr,
    })
  })
}
