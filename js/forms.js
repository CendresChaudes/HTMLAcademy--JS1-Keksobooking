import { addValidators, isValidForm } from './new-adv-form-validation.js';
import { initFormUserInputsModule, resetSlider, resetAddressInput } from './new-adv-form-inputs.js';
import { renderSuccessMessage, renderErrorMessage } from './new-adv-form-messages.js';
import { resetMap } from './map.js';
import { sendData } from './data.js';

const SEND_DATA_URL = 'https://27.javascript.pages.academy/keksobooking';

const newAdvertisementForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const deactivateFormElements = (form) => Array.from(form.elements).forEach((element) => {
  if (element.tagName !== 'FIELDSET') {
    element.disabled = true;
  }
});

const activateFormElements = (form) => {
  Array.from(form.elements).forEach((element) => {
    element.disabled = false;
  });
};

const deactivateForms = () => {
  filtersForm.classList.add('map__filters--disabled');
  newAdvertisementForm.classList.add('ad-form--disabled');
  deactivateFormElements(filtersForm);
  deactivateFormElements(newAdvertisementForm);
};

const activateForms = () => {
  filtersForm.classList.remove('map__filters--disabled');
  newAdvertisementForm.classList.remove('ad-form--disabled');
  activateFormElements(filtersForm);
  activateFormElements(newAdvertisementForm);
};

const resetForms = () => {
  newAdvertisementForm.reset();
  filtersForm.reset();
  resetAddressInput();
  resetSlider();
};

const onSendDataSuccess = () => {
  renderSuccessMessage();
  resetForms();
  resetMap();
};

const onSendDataFail = () => {
  renderErrorMessage();
};

const onNewAdvertisementFormSubmit = (evt) => {
  evt.preventDefault();
  if (isValidForm()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataFail, new FormData(evt.target));
  }
};

const onNewAdvertisementFormReset = () => {
  resetForms();
  resetMap();
};

const initFormsModule = () => {
  newAdvertisementForm.addEventListener('submit', onNewAdvertisementFormSubmit);
  newAdvertisementForm.addEventListener('reset', onNewAdvertisementFormReset);
  deactivateForms();
  addValidators();
  initFormUserInputsModule();
};

export { initFormsModule, activateForms };
