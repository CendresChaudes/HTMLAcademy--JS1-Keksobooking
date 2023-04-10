import { renderSimilarAdvertisementMarkers, clearSimilarAdvertisementMarkers } from './map.js';
import { debounce } from './utils.js';

const DATA_RANGE_START = 0;
const DATA_RANGE_END = 10;
const RERENDER_DELAY = 500;

const filtersForm = document.querySelector('.map__filters');

const filterByFilterValue = (value, attr, data) => {
  if (value === 'any') {
    return data;
  }
  if (attr === 'price') {
    switch(value) {
      case 'low':
        return data.filter(({offer}) => offer[attr] < 10000);
      case 'middle':
        return data.filter(({offer}) => offer[attr] >= 10000 && offer[attr] <= 50000);
      case 'high':
        return data.filter(({offer}) => offer[attr] > 50000);
    }
  }

  return data.filter(({offer}) => String(offer[attr]) === value);
};

const filterAdvertisements = (data) => {
  const checkedFeatures = document.querySelector('#housing-features').querySelectorAll(':checked');
  let dataCopy = data;

  dataCopy = filterByFilterValue(document.querySelector('#housing-type').value, 'type', dataCopy);
  dataCopy = filterByFilterValue(document.querySelector('#housing-price').value, 'price', dataCopy);
  dataCopy = filterByFilterValue(document.querySelector('#housing-rooms').value, 'rooms', dataCopy);
  dataCopy = filterByFilterValue(document.querySelector('#housing-guests').value, 'guests', dataCopy);

  for (const feature of checkedFeatures) {
    dataCopy = dataCopy.filter(({offer}) => offer.features?.includes(feature.value));
  }

  return dataCopy;
};

const rerenderSimilarAdvertisementMarkers = (data) => {
  clearSimilarAdvertisementMarkers();
  const filteredData = filterAdvertisements(data.slice());
  renderSimilarAdvertisementMarkers(filteredData.slice(DATA_RANGE_START, DATA_RANGE_END));
};

const rerenderTimeout = debounce((data) => rerenderSimilarAdvertisementMarkers(data), RERENDER_DELAY);

const onFiltersFormChange = (data) => rerenderTimeout(data);

const initFilters = (data) => filtersForm.addEventListener('change', () => onFiltersFormChange(data));

export { initFilters };
