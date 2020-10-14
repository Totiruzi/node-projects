const postman_request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoib3llbWVjaGkiLCJhIjoiY2tmd2s2amd0MXFvYzJzbXp2eWc2cm9ibCJ9.dVEFzBGW5kD7vscI2G4cGQ&limit=1`;
  postman_request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Could not connect to app', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location');
    } else {
      // const data = res.body.features[0].geometry.coordinates;
      // const city = res.body.features[0].place_name
      callback(
        undefined, {
        // `The coordination latitude and longitude for ${city} are; \n  lat: ${data[1]}\n long: ${data[0]}`
        lat: body.features[0].geometry.coordinates[1],
        lon: body.features[0].geometry.coordinates[0],
        city: body.features[0].place_name
        }
      );
    }
  });
};
module.exports = {
  geocode
}