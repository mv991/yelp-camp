
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campLocation.geometry.coordinates,
    zoom: 9
});
 map.addControl(new mapboxgl.NavigationControl());
new mapboxgl.Marker()
    .setLngLat( campLocation.geometry.coordinates)
    .setPopup (
new mapboxgl.Popup({offset:25})
     .setHTML(`<h3>${campLocation.title}<h/3>`)
)
    .addTo(map)
