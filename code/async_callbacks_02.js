const fs = require('fs');

fs.readFile('blob.txt', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
console.log('Be careful for Sauron!');
