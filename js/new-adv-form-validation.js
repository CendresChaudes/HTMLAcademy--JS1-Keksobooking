import { checkStringMinLength } from './utils.js';

const MIN_STRING_TITLE_LENGTH = 30;
const MAX_ROOMS_COUNT_VALUE = 100;
const NOT_FOR_GUESTS_VALUE = 0;

const MinPriceTypeValues = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

const titleSelect = document.querySelector('#title');
const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsCountSelect = document.querySelector('#room_number');
const guestsCountSelect = document.querySelector('#capacity');
const newAdvertisementForm = document.querySelector('.ad-form');

const pristineSetup = new Pristine(newAdvertisementForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p'
}, false);

const checkTitleLength = (value) => checkStringMinLength(value, MIN_STRING_TITLE_LENGTH);

const checkMinPrice = (value) => Number(value) >= MinPriceTypeValues[typeSelect.value.toUpperCase()];

const checkGuestsCount = (value) => {
  const numberValue = Number(value);
  const numberRoomsCount = Number(roomsCountSelect.value);

  if (numberRoomsCount === MAX_ROOMS_COUNT_VALUE) {
    return numberValue === NOT_FOR_GUESTS_VALUE;
  }
  if (numberValue === NOT_FOR_GUESTS_VALUE) {
    return numberRoomsCount === MAX_ROOMS_COUNT_VALUE;
  }

  return numberValue <= numberRoomsCount;
};

const addValidators = () => {
  pristineSetup.addValidator(
    titleSelect,
    checkTitleLength,
    'Минимальная длина - 30 символов!'
  );

  pristineSetup.addValidator(
    priceInput,
    checkMinPrice,
    `«Бунгало» — минимальная цена за ночь 0, «Квартира» — минимальная цена за ночь 1 000; «Отель» — минимальная цена за ночь 3 000;
    «Дом» — минимальная цена 5 000; «Дворец» — минимальная цена 10 000!`
  );

  pristineSetup.addValidator(
    guestsCountSelect,
    checkGuestsCount,
    'Количество комнат не должно быть меньше количества гостей. Если выбрано "100 комнат", то можно выбрать только "не для гостей"!'
  );
};

const isValidForm = () => pristineSetup.validate();

export { addValidators, isValidForm };
