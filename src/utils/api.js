export const config = {
  COMMON_API: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

// универсальная ф-я для запроса с проверкой ответа (url, options - если добавятся варианты запросов)
export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

// универсальная ф-я проверки ответа от сервера
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// получение data ингредиентов с сервера
export function getIngredients() {
  return request(`${config.COMMON_API}/ingredients`, {
    headers: config.headers
  })
}

// отправка данных на сервер
export function postOrder(arr) {
  return request(`${config.COMMON_API}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      ingredients: arr,
    })
  })
}
