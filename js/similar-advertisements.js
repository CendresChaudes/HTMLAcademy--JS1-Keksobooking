const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getTypeHousing = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
    default:
      return 'Тип жилья не найден!';
  }
};

const renderFeatures = (element, features) => {
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
  photosContainer.innerHTML = '';

  photos.forEach((photo) => {
    const popupPhoto = popupPhotoTemplate.cloneNode(true);
    popupPhoto.src = photo;
    photosContainer.append(popupPhoto);
  });
};

const createAdvertisementCard = ({author, offer}) => {
  const advertisementCard = advertisementCardTemplate.cloneNode(true);
  advertisementCard.querySelector('.popup__avatar').src = author.avatar;
  advertisementCard.querySelector('.popup__title').textContent = offer.title;
  advertisementCard.querySelector('.popup__text--address').textContent = offer.address;
  advertisementCard.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  advertisementCard.querySelector('.popup__type').textContent = getTypeHousing(offer.type);
  advertisementCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertisementCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertisementCard.querySelector('.popup__description').textContent = offer.description;
  renderFeatures(advertisementCard, offer.features);
  renderPhotos(advertisementCard, offer.photos);

  return advertisementCard;
};

export { createAdvertisementCard };
