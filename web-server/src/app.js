const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views ');
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
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'We are here to help',
    content:
      'When people get stock, they ask for help and that is why we are here woth a helping hand 128519',
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: '19 degree Celcius',
    location: 'Krasnodar',
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
