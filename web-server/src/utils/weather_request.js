const postman_request = require('postman-request');

const weatherForcast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4716a330633f91551676cc1ea6737dcf&query=${lat},${lon}&units=m`;
  postman_request({ url, json: true }, (error, res) => {
    if (error) {
      callback('Could not connect to app');
    } else if (res.body.error) {
      callback('Unable to find location 2', undefined);
    } else {
      const { precip, temperature, weather_descriptions } = res.body.current;
      const data = res.body;
      callback(
        undefined,
        `It is currently ${weather_descriptions[0]} with a temperature of  ${temperature} degree celsius in ${data.location.name} and a ${precip}% of rain.`
      );
    }
  });
};

module.exports = { weatherForcast };
