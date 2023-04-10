const AdvertisementTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getPriceInfo = (price) => price ? `${price} <span>₽/ночь</span>` : '';

const getRoomsWord = (rooms) => {
  if (rooms % 10 === 1) {
    return 'комната';
  } else if (rooms % 10 === 2 || rooms % 10 === 3 || rooms % 10 === 4) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

const getGuestsWord = (guests) => guests % 10 === 1 ? 'гостя' : 'гостей';

const getCapacityInfo = (rooms, guests) => {
  if (rooms === 'undefined' || guests === 'undefined') {
    return;
  }

  return `${rooms} ${getRoomsWord(rooms)} для ${guests} ${getGuestsWord(guests)}`;
};

const getCheckinCheckoutInfo = (checkin, checkout) => {
  if (checkin === 'undefined' || checkout === 'undefined') {
    return;
  }

  return `Заезд после ${checkin}, выезд до ${checkout}`;
};

const renderFeatures = (element, features) => {
  if (!features) {
    const featuresContainer = element.querySelector('.popup__features');
    featuresContainer.hidden = true;
    return;
  }

  const featuresList = element.querySelectorAll('.popup__feature');
  featuresList.forEach((item) => {
    const hasFeature = features.some((feature) => item.classList.contains(`popup__feature--${feature}`));
    if (!hasFeature) {
      item.remove();
    }
  });
};

const renderPhotos = (element, photos) => {
  const popupPhotoTemplate = element.querySelector('.popup__photo').cloneNode(true);
  const photosContainer = element.querySelector('.popup__photos');

  if (!photos) {
    photosContainer.hidden = true;
    photosContainer.innerHTML = '';
    return;
  }

  photosContainer.innerHTML = '';
  photos.forEach((photo) => {
    const popupPhoto = popupPhotoTemplate.cloneNode(true);
    popupPhoto.src = photo;
    photosContainer.append(popupPhoto);
  });
};

const hideBlock = (element, selector) => {
  element.querySelector(`${selector}`).hidden = true;
};

const createAdvertisementCard = ({author, offer}) => {
  const card = advertisementCardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = author.avatar ?? hideBlock(card, '.popup__avatar');
  card.querySelector('.popup__title').textContent = offer.title ?? hideBlock(card, '.popup__title');
  card.querySelector('.popup__text--address').textContent = offer.address ?? hideBlock(card, '.popup__text--address');
  card.querySelector('.popup__text--price').innerHTML = getPriceInfo(offer.price) ?? hideBlock(card, '.popup__text--price');
  card.querySelector('.popup__type').textContent = AdvertisementTypes[offer.type.toUpperCase()] ?? hideBlock(card, '.popup__type');
  card.querySelector('.popup__text--capacity').textContent = getCapacityInfo(offer.rooms, offer.guests) ?? hideBlock(card, '.popup__text--capacity');
  card.querySelector('.popup__text--time').textContent = getCheckinCheckoutInfo(offer.checkin, offer.checkout) ?? hideBlock(card, '.popup__text--time');
  card.querySelector('.popup__description').textContent = offer.description ?? hideBlock(card, '.popup__description');
  renderFeatures(card, offer.features);
  renderPhotos(card, offer.photos);

  return card;
};

export { createAdvertisementCard };
