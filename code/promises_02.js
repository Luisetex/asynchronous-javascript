const promisifiedTimeOut = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello!');
  }, 3000);
});

promisifiedTimeOut
  .then((result) => {
    console.log(result);
    return result.toUpperCase();
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => console.log(error))
