const fs = require('fs');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}
readFilePromise('blob.txt')
  .then((data) => console.log(data))
  .catch(error => console.log(error));

const fsPromise = require('fs').promises;

fsPromise.readFile('blob.txt', 'utf8')
  .then(data => console.log(data))
  .catch(error => console.log(error));