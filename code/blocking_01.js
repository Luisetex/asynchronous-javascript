const fs = require('fs');

const data = fs.readFileSync('blob.txt', 'utf8');
console.log(data);
console.log('Be careful for Sauron!');
