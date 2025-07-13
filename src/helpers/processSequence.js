/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

// Вспомогательный валидатор строки-числа
const isValidNumberString = (str) => {
  const lengthRule = str.length < 10 && str.length > 2;
  const positiveRule = parseFloat(str) > 0;
  const numericRule = /^\d+(?:\.\d+)?$/.test(str);
  return lengthRule && positiveRule && numericRule;
};

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  Promise.resolve(value)
    .then((str) => {
      if (!isValidNumberString(str)) {
        throw new Error("ValidationError");
      }
      return str;
    })
    .then((str) => {
      const num = Math.round(parseFloat(str));
      writeLog(num);
      return num;
    })
    .then((num) =>
      api.get("https://api.tech/numbers/base", {
        number: String(num),
        from: 10,
        to: 2,
      })
    )
    .then(({ result: binary }) => {
      writeLog(binary);
      return binary;
    })
    .then((binary) => {
      const len = binary.length;
      writeLog(len);
      return len;
    })
    .then((len) => {
      const squared = len * len;
      writeLog(squared);
      return squared;
    })
    .then((squared) => {
      const remainder = squared % 3;
      writeLog(remainder);
      return remainder;
    })
    .then((id) => {
      // console.log("Making API call to animals.tech with id:", id);
      return api.get(`https://animals.tech/${id}`)({});
    })
    .then((response) => {
      // console.log("API response:", response);
      const { result: animal } = response;
      handleSuccess(animal);
    })
    // Обработка ошибок
    .catch((err) => {
      // console.log("Error caught:", err);
      const message =
        err.message === "ValidationError" ? "ValidationError" : err;
      handleError(message);
    });
};

export default processSequence;
