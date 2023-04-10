import { addValidators, isValidForm, resetPristine } from './new-adv-form-validation.js';
import { initFormUserInputsModule, resetSlider, resetAddressInput } from './new-adv-form-inputs.js';
import { renderSuccessMessage, renderErrorMessage } from './new-adv-form-messages.js';
import { resetMap } from './map.js';
import { sendData } from './data.js';

const SEND_DATA_URL = 'https://27.javascript.pages.academy/keksobooking';
const DEFAULT_AVATAR_ICON_SRC = 'img/muffin-grey.svg';

const newAdvertisementForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const avatarUploadInput = document.querySelector('#avatar');
const avatarUploadPreview = document.querySelector('.ad-form-header__preview img');
const photoUploadInput = document.querySelector('#images');
const photoUploadPreview = document.querySelector('.ad-form__photo img');

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
  avatarUploadPreview.src = DEFAULT_AVATAR_ICON_SRC;
  photoUploadPreview.hidden = true;
  newAdvertisementForm.reset();
  filtersForm.reset();
  resetAddressInput();
  resetSlider();
  resetPristine();
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

const onAvatarUploadInputChange = () => {
  avatarUploadPreview.src = URL.createObjectURL(avatarUploadInput.files[0]);
};

const onPhotoUploadInputChange = () => {
  photoUploadPreview.src = URL.createObjectURL(photoUploadInput.files[0]);
  photoUploadPreview.hidden = false;
};

const initFormsModule = () => {
  newAdvertisementForm.addEventListener('submit', onNewAdvertisementFormSubmit);
  newAdvertisementForm.addEventListener('reset', onNewAdvertisementFormReset);
  avatarUploadInput.addEventListener('change', onAvatarUploadInputChange);
  photoUploadInput.addEventListener('change', onPhotoUploadInputChange);
  deactivateForms();
  addValidators();
  initFormUserInputsModule();
};

export { initFormsModule, activateForms };
