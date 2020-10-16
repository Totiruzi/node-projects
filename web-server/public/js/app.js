console.log('JavaScript for the clientside');

// fetch('http://puzzle.mead.io/puzzle').then((respond) => {
//   respond.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = inputSearch.value;
  const url = `/weather?address=${address}`;
  messageOne.textContent = 'Loading.....';
  messageTwo.textContent = '';

  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageTwo.textContent = ` location: ${data.address} ${data.weatherForecast}`;
    });
  });
});
