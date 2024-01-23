// поиск по массиву (ищем элемент по id)
export const findItem = (arr, value) => {
  return arr.find(item => item._id === value);
}


// достаем рандомную фразу из массива
export const randomPhrase = (phrases) => {
  return phrases[Math.floor(Math.random() * phrases.length)];
}


// фильтрация массива на уникальные итемы
export const getUniqueItems = (arr) => {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
}


// вычисление суммарной стоимости переданных ингредиентов (берем стоимость из переданного ingredientList с данными)
export const calculateTotalCost = (ingredients, ingredientList) => {
  let totalCost = 0;

  // для каждого id в заказе ищем нужный ингредиент в общем списке ингредиентов
  ingredients.forEach((id) => {
    const ingredient = ingredientList.find((ingredient) => ingredient._id === id);

    // если нашли, прибавляем его стоимость к общей
    if (ingredient) {
      totalCost += ingredient.price;
    }
  });

  return totalCost;
}


// описываем правила рендера номеров заказов в списке
export const renderOrderNumbers = (orderNumbers) => {
  let columnIndex = 1;
  let rowIndex = 1;

  return orderNumbers.map((order, index) => {
    // переходим к след. колонке при достижении 10 заказов
    if (index % 10 === 0 && index !== 0) {
      columnIndex++;
      rowIndex = 1; // сбрасываем индекс строки
    }

    // задаем позицию в зависимости от индекса элемента
    const itemStyle = {
      gridColumn: columnIndex,
      gridRow: rowIndex,
    };
    rowIndex++; // увеличиваем индекс строки

    // возвращаем элемент списка
    return (
      <li key={index} style={itemStyle}>
        {order}
      </li>
    );
  });
}


// сортируем переданный список ингредиентов на списки из одинаковых id и записываем в объект, где ключ - это id
export const sortIngredients = (ingredientList) => {
  const duplicates = {};

  ingredientList.forEach((item) => {
    if (duplicates[item]) {
      duplicates[item].push(item);
    } else {
      duplicates[item] = [item];
    }
  });

  // возвращаем объект вида { id1: [ ...все id1 из переданного списка ], id2: [ ...все id2 ], и т.д. }
  return duplicates;
}
