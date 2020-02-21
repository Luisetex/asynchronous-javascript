const fs = require('fs');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

async function asyncReadFile(file) {
  try {
    const data = await readFilePromise(file);
    console.log(data)
  }
  catch(error) {
    console.log(error)
  }
}

asyncReadFile('blob.txt')
console.log('Hello!');