function foo() {
  throw new Error('Hello! I failed!');
}

function bar() {
  foo();
}

function baz() {
  bar();
}

baz();