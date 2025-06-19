mapboxgl.accessToken = mapToken;

// Coordinates passed in the script tag of show_country.ejs
if (typeof coordinates !== "undefined" && Array.isArray(coordinates)) {
    const map = new mapboxgl.Map({
        container: 'map',
        center: coordinates, // [lng, lat]
        zoom: 3
    });

    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
}
