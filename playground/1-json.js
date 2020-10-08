const fs = require('fs');

const book = {
  name: 'Christopher',
  planet: 'Earth',
  age: '46'
}

const bookJson = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJson);
fs.appendFileSync('1-json.json', bookJson)

const readBook = fs.readFileSync('1-json.json').toString()

const parseJson = JSON.parse(readBook)
console.log(parseJson)