// поиск по массиву (ищем элемент по id)
export const findItem = <T extends { _id: string }>(arr: T[], value: string): T | undefined => {
  return arr.find(item => item._id === value);
}


// достаем рандомную фразу из массива
export const randomPhrase = (phrases: string[]): string => {
  return phrases[Math.floor(Math.random() * phrases.length)];
}


// фильтрация массива на уникальные итемы
export const getUniqueItems = <T>(arr: T[]): T[] => {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
}


// вычисление суммарной стоимости переданных ингредиентов (берем стоимость из переданного ingredientList с данными)
export const calculateTotalCost = <T extends { _id: string, price: number }>(
  ingredients: string[], ingredientList: T[]): number => {
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
export const getNumbersGridOrder = (orderNumbers: number[]) => {
  let columnIndex = 1;
  let rowIndex = 1;

  const content = orderNumbers.map((order, index) => {
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

    // сохраняем в объект номер заказа и его позицию в grid-сетке
    const item = {
      style: itemStyle,
      order: order
    }
    return item;
  });
  // возвращаем массив объектов с полями style и order
  return content;
}


type TDuplicates = {
  [key: string]: string[];
};
// сортируем переданный список ингредиентов на списки из одинаковых id и записываем в объект, где ключ - это id
export const findDuplicates = (ingredientList: string[]): TDuplicates => {
  const duplicates: TDuplicates = {};

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
