import { getRandomInteger, getRandomFloat } from './utils.js';

const Titles = [
  'Первый',
  'Второй',
  'Третий',
  'Четвертый',
  'Пятый',
  'Шестой',
  'Седьмой',
  'Восьмой',
  'Девятый',
  'Десятый'
];

const Types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const Checkins = [
  '12:00',
  '13:00',
  '14:00'
];

const Checkouts = [
  '12:00',
  '13:00',
  '14:00'
];

const Features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const Descriptions = [
  'Первый отель. Какое-то описание...',
  'Второй отель. Какое-то описание...',
  'Третий отель. Какое-то описание...',
  'Четвертый отель. Какое-то описание...',
  'Пятый отель. Какое-то описание...',
  'Шестой отель. Какое-то описание...',
  'Седьмой отель. Какое-то описание...',
  'Восьмой отель. Какое-то описание...',
  'Девятый отель. Какое-то описание...',
  'Десятый отель. Какое-то описание...',
];

const Photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

let id = 1;

const createLocationData = () => (
  {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5)
  }
);

const createAdvertisementData = () => {
  const locationData = createLocationData();

  const advertisement = {
    author: {
      avatar: `img/avatars/user${String(id).padStart(2, '0')}.png`
    },
    offer: {
      title: Titles[id - 1],
      address: `${locationData.lat}, ${locationData.lng}`,
      price: getRandomInteger(500, 4000),
      type: Types[getRandomInteger(0, 4)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 8),
      checkin: Checkins[getRandomInteger(0, 2)],
      checkout: Checkouts[getRandomInteger(0, 2)],
      features: Features.slice(0, [getRandomInteger(1, 6)]),
      description: Descriptions[id - 1],
      photos: Photos.slice(0, [getRandomInteger(1, 3)])
    },
    location: locationData
  };

  id++;

  return advertisement;
};

const createAdvertisementDataset = () => Array.from({ length: 10 }, createAdvertisementData);

export { createAdvertisementDataset };
