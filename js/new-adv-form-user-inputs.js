const MinPriceTypeValues = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsCountSelect = document.querySelector('#room_number');
const guestsCountSelect = document.querySelector('#capacity');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const defaultInputs = () => {
  const selectedRoomsCountValue = roomsCountSelect.querySelector('[selected]').value;
  guestsCountSelect.querySelector(`[value="${selectedRoomsCountValue}"]`).selected = 'selected';

  priceInput.placeholder = MinPriceTypeValues[typeSelect.value.toUpperCase()];
};

const onTypeSelectChange = (evt) => {
  priceInput.placeholder = MinPriceTypeValues[evt.target.value.toUpperCase()];
};

const onTimeinSelectChange = (evt) => {
  timeoutSelect.querySelector(`[value="${evt.target.value}"]`).selected = 'selected';
};

const onTimeoutSelectChange = (evt) => {
  timeinSelect.querySelector(`[value="${evt.target.value}"]`).selected = 'selected';
};

const initFormUserInputsModule = () => {
  defaultInputs();
  typeSelect.addEventListener('change', onTypeSelectChange);
  timeinSelect.addEventListener('change', onTimeinSelectChange);
  timeoutSelect.addEventListener('change', onTimeoutSelectChange);
};

export { initFormUserInputsModule };
