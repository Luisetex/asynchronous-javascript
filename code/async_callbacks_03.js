console.log('Hello');

setTimeout(function callback(){
  console.log('First timeout!!');
}, 5000);

setTimeout(function callback() {
  console.log('Hi! Second Timeout here!')
}, 1000);

console.log('Don\'t mind me, just passing through');
