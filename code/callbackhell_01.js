function superLongComputation(integer1, integer2) {
  setTimeout(() => {
    const result = sum(integer1, integer2);
    setTimeout(() => {
      const result_2 = square(result);
      setTimeout(() => {
        const result_3 = multiply(result_2, 100);
        setTimeout(()=>{
          console.log(result_3);
        }, 1000)
      }, 1000);
    },1000);
  }, 1000);
}

function sum(a, b) {
  return a + b;
}

function square(a) {
  return a*a;
}

function multiply(a, b) {
  return a*b;
}

superLongComputation(1, 2);
console.log('This is gonna take a while...');