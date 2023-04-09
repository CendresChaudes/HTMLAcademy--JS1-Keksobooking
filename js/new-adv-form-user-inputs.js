const NUMBER_SYSTEM = 10;

const MAP_DEFAULT_SETUP = {
  lat: 35.67240,
  lng: 139.75266
};

const DefaultSliderValues = {
  MIN: 0,
  START: 0,
  CONNECT: 'lower'
};

const MinPriceTypeValues = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

const priceSlider = document.querySelector('.ad-form__slider');

const addressInput = document.querySelector('#address');
const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsCountSelect = document.querySelector('#room_number');
const guestsCountSelect = document.querySelector('#capacity');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const onPriceInputChange = () => {
  priceSlider.noUiSlider.set(priceInput.value);
  if (priceInput.value === `${DefaultSliderValues.MIN}`) {
    priceInput.value = '';
  }
};

const initSLider = () => {
  noUiSlider.create(priceSlider, {
    range: {
      min: DefaultSliderValues.MIN,
      max: Number(priceInput.max),
    },
    start: DefaultSliderValues.START,
    connect: DefaultSliderValues.CONNECT,
    format: {
      to: function (value) {
        return parseInt(value, NUMBER_SYSTEM);
      },
      from: function (value) {
        return parseInt(value, NUMBER_SYSTEM);
      },
    },
  });

  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });
  priceInput.value = '';

  priceInput.addEventListener('change', onPriceInputChange);
};

const defaultInputs = () => {
  const selectedRoomsCountValue = roomsCountSelect.querySelector('[selected]').value;
  guestsCountSelect.querySelector(`[value="${selectedRoomsCountValue}"]`).selected = 'selected';

  priceInput.placeholder = MinPriceTypeValues[typeSelect.value.toUpperCase()];
};

const onTypeSelectChange = (evt) => {
  priceSlider.noUiSlider.set(DefaultSliderValues.MIN);
  priceInput.placeholder = MinPriceTypeValues[evt.target.value.toUpperCase()];
  priceInput.value = 'undefined';
};

const onTimeinSelectChange = (evt) => {
  timeoutSelect.querySelector(`[value="${evt.target.value}"]`).selected = 'selected';
};

const onTimeoutSelectChange = (evt) => {
  timeinSelect.querySelector(`[value="${evt.target.value}"]`).selected = 'selected';
};

const initFormUserInputsModule = () => {
  defaultInputs();
  initSLider();

  typeSelect.addEventListener('change', onTypeSelectChange);
  timeinSelect.addEventListener('change', onTimeinSelectChange);
  timeoutSelect.addEventListener('change', onTimeoutSelectChange);

  addressInput.value = `${MAP_DEFAULT_SETUP.lat}, ${MAP_DEFAULT_SETUP.lng}`;
};

export { initFormUserInputsModule };
