# [Проект Stellar Burger](https://nurmy-26.github.io/react-stellar-burger/)

## Обзор
*Приложение "Космическая бургерная" - создайте свой уникальный бургер!*
* Проект создан с использованием Create React App и функциональных компонентов. 
* Управление состоянием осуществляется с помощью Redux Toolkit. 
* Для получения данных компонентов используются API запросы через fetch. 
* UI компоненты взяты из [библиотеки](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/).
* Для оформления заказа, просмотра информации об ингредиентах и детального состава заказа используются модальные окна.
* Для маршрутизации между страницами используется React Router, а для страниц с данными о заказах и ингредиентах - динамическое создание маршрутов. 
* Также в проекте реализованы защищенные маршруты, доступные только для авторизованных или только для неавторизованных пользователей. Реализация защищенных маршрутов представлена в компоненте Protected.
* Для аутентификации используется JWT, который хранится в куках.
* Данные для обеих лент заказов (общей и для авторизованных пользователей) поступают в реальном времени через WebSocket соединения.
* Проект типизирован с помощью TypeScript.

### Ссылки
* [Макет в Figma](https://bit.ly/3IZ7rSr)
* [Стартовый шаблон CRA](https://create-react-app.dev/)
* [Библиотека компонентов](https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components)
* [Документация компонентов](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)

### Стек технологий
<a href="https://htmlbook.ru/html5"><img src="https://i.ibb.co/gtQd9YB/free-icon-html-5-5968267.png" width="50" height="50" alt = "HTML5 icon"> |  </a><a href="https://htmlbook.ru/css3"><img src="https://i.ibb.co/0ZFNwk7/free-icon-css-3-5968242.png" width="50" height="50" alt = "CSS3 icon"></a> |  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://i.ibb.co/XW2SHkT/free-icon-js-5968292.png" width="50" height="50" alt = "JavaScript icon"></a> |  <a href="https://webpack.js.org/"><img src="https://i.ibb.co/7CqRLMX/icons8-webpack-64.png" alt="icons8-webpack-64" width="50" height="50" alt = "Webpack icon"></a> |  <a href="https://react.dev/"><img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/></a> |  <a href="https://redux-toolkit.js.org/"><img src="https://redux.js.org/img/redux.svg" width="50" height="50" alt = "Redux icon"></a> | <a href="https://www.typescriptlang.org/"><img src="https://www.svgrepo.com/show/374144/typescript.svg" width="50" height="50" alt = "TypeScript icon"></a>
| --- | --- | --- | --- | --- | --- | --- |
| HTML5 | CSS3 | &nbsp;&nbsp;&nbsp;JS | Webpack | React | Redux Toolkit | &nbsp;&nbsp;&nbsp;TS |
