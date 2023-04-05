const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomFloat = (min, max, precision) => +(Math.random() * (max - min) + min).toFixed(precision);

export { getRandomInteger, getRandomFloat };
