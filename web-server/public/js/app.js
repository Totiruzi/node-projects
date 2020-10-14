console.log('JavaScript for the clientside');

const url = 'http://localhost:3001/weather?address=krasnodar';

// fetch('http://puzzle.mead.io/puzzle').then((respond) => {
//   respond.json().then((data) => {
//     console.log(data);
//   });
// });

fetch(url).then((res) => {
  res.json().then((data) => {
    if(data.error) {
      return console.log(data.error)
    }
    console.log(data)
    console.log(` location: ${data.address} \n ${data.weatherForecast}`);
  });
});
