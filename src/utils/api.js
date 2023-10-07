export const COMMON_API = 'https://norma.nomoreparties.space/api';

// универсальная ф-я для запроса с проверкой ответа (url, options - если добавятся варианты запросов)
export function request(url) {
  return fetch(url).then(checkResponse)
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
  return request(`${COMMON_API}/ingredients`)
}
