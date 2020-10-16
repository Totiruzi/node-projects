const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode } = require('./utils/geocode');
const { weatherForcast } = require('./utils/weather_request');

const app = express();
const port = process.env.PORT || 3001
// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//using Handlebars engine and views has a midleware
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directoyr to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Chris',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Getting to know us!',
    name: 'Chris Onowu',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'We are here to help',
    content:
      'When people get stock, they ask for help and that is why we are here woth a helping hand',
    name: 'Onowu Christopher',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { lat, lon, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      weatherForcast(lat, lon, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          weatherForecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Oopp!! 404, Page not Found',
    errorMessage: 'Help article not found!!!',
    name: 'Chris',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oopp!! 404, Page not Found',
    errorMessage: 'Page does not exit!!',
    name: 'Chris',
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
