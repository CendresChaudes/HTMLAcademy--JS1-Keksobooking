import { activateForms } from './forms.js';
import { createAdvertisementCard } from './similar-advertisements.js';
// import { createAdvertisementDataset } from './temp-data.js';

const MAP_DEFAULT_SETUP = {
  lat: 35.67240,
  lng: 139.75266,
  scale: 13
};

const COORDINATES_PRECISION = 5;

const MarkerSetups = {
  MAIN: {
    size: 52,
    url: '../img/main-pin.svg',
    isDraggable: true,
    type: 'MAIN'
  },
  SIMILAR: {
    size: 40,
    url: '../img/pin.svg',
    isDraggable: false,
    type: 'SIMILAR'
  }
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', activateForms)
  .setView({
    lat: MAP_DEFAULT_SETUP.lat,
    lng: MAP_DEFAULT_SETUP.lng,
  }, MAP_DEFAULT_SETUP.scale,);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
      Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>`,
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainMarker = createMarker(MAP_DEFAULT_SETUP.lat, MAP_DEFAULT_SETUP.lng, MarkerSetups.MAIN.url, MarkerSetups.MAIN.isDraggable, MarkerSetups.MAIN.type);

const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: MAP_DEFAULT_SETUP.lat,
    lng: MAP_DEFAULT_SETUP.lng,
  });
};

function createPin (url, type) {
  const pin = L.icon({
    iconUrl: url,
    iconSize: [MarkerSetups[type].size, MarkerSetups[type].size],
    iconAnchor: [MarkerSetups[type].size / 2, MarkerSetups[type].size],
  });

  return pin;
}

function createMarker (lat, lng, url, isDraggable, type, item = null) {
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      draggable: isDraggable,
      icon: createPin(url, type),
    },
  );

  if (type === MarkerSetups.MAIN.type) {
    marker.on('moveend', (evt) => {
      addressInput.value = `${evt.target.getLatLng().lat.toFixed(COORDINATES_PRECISION)}, ${evt.target.getLatLng().lng.toFixed(COORDINATES_PRECISION)}`;
    });
  }

  if (type === MarkerSetups.SIMILAR.type) {
    marker.bindPopup(createAdvertisementCard(item));
  }

  return marker;
}

const renderMainMarker = () => mainMarker.addTo(map);

renderMainMarker();

const renderSimilarAdvertisementMarkers = (data) => {
  data.forEach((item) => createMarker(item.location.lat, item.location.lng, MarkerSetups.SIMILAR.url, MarkerSetups.SIMILAR.isDraggable, MarkerSetups.SIMILAR.type, item)
    .addTo(map));
};

export { resetMainMarker };
