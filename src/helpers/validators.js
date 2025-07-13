import { pipe, values, filter, length, all, any } from "ramda";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const countColor = (color) =>
  pipe(
    values,
    filter((val) => val === color),
    length
  );

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) =>
  triangle === "white" &&
  circle === "white" &&
  star === "red" &&
  square === "green";

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => countColor("green")(shapes) >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) =>
  countColor("red")(shapes) === countColor("blue")(shapes);

// 4. Синий круг, красная звезда, оранжевый квадрат, треугольник любого цвета
export const validateFieldN4 = ({ circle, star, square }) =>
  circle === "blue" && star === "red" && square === "orange";

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
  const colors = ["red", "blue", "green", "orange"];
  return any((color) => countColor(color)(shapes) >= 3)(colors);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная.
export const validateFieldN6 = (shapes) =>
  countColor("green")(shapes) === 2 &&
  shapes.triangle === "green" &&
  countColor("red")(shapes) === 1;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) =>
  all((val) => val === "orange")(values(shapes));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => star !== "red" && star !== "white";

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) =>
  all((val) => val === "green")(values(shapes));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ triangle, square }) =>
  triangle === square && triangle !== "white";
