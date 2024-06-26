// функция для получения значения куки с определённым именем name
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  // вернет найденную куку или undefined
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// type conditionalType =
// функция для установки или обновления куки
// props - для доп. св-в, таких как expires (срок жизни куки в секундах)
// если не установить expires или указать срок жизни 0, кука станет сессионной и удалится, когда пользователь закроет браузер
export function setCookie(name: string, value: string,
  props: { [key: string]: unknown } & { expires?: number | Date | string } = {}) {
  props = {
    ...props,
    // задаем корневой path, чтоб куки были доступны с любой страницы приложения
    path: '/'
  } || {};
  let exp = props.expires;
  // если указано число, то это количество секунд до истечения срока действия куки
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    // преобразуем его в миллисекунды, т.к. JavaScript использует мс для работы с датами
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  // eсли expires не number, оно преобразуется в соответствующее время, а затем - в UTC-строку
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}


// функция удаления куки (установит expires в прошедшее время, что приведет к немедленному удалению куки браузером)
export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
