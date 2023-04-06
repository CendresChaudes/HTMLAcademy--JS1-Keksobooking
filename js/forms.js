import { addValidators } from './form-validation.js';

const newAdvertisementForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const deactivateFormElements = (form) => Array.from(form.elements).forEach((element) => {
  if (element.tagName !== 'FIELDSET') {
    element.disabled = true;
  }
});

const activateFormElements = (form) => Array.from(form.elements).forEach((element) => {
  element.disabled = false;
});

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

const initFormModule = () => {
  deactivateForms();
  activateForms();
  addValidators();
};

export { initFormModule };

