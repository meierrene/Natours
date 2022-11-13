/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWVpZXJyZW5lIiwiYSI6ImNsYTMzM3ZvYzBpYjgzbnJwZWxhanVnZzYifQ.o9h8s8-Jr1NwqzZDmaav7Q';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/meierrene/cla3ytc4x000a14o08ledsdzv', // Black and white map
    style: 'mapbox://styles/meierrene/cla32iano001114rtq8xm6xsr', // Colorful map
    scrollZoom: false,
    doubleClickZoom: true,
    projection: 'equirectangular',

    // interactive: false,
  });
  map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 40 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 250,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
