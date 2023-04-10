const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomFloat = (min, max, precision) => +(Math.random() * (max - min) + min).toFixed(precision);

const checkStringMinLength = (string, length) => String(string).length >= length;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getRandomFloat, checkStringMinLength, debounce };
