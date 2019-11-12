//Object.hasOwnProperty(
Object.create();

/**
 * freeze,seal 操作
 */

var p = Object.create(
  { z: 0 },
  {
    x: { value: 1, writable: false, enumerable: true, configurable: true },
    y: { value: 2, writable: false, enumerable: true, configurable: true }
  }
);

var p1 = Object.create(
  { z: 0 },
  {
    x: { value: 1, writable: false, enumerable: true, configurable: true },
    y: { value: 2, writable: false, enumerable: true, configurable: true }
  }
);
Object.freeze(p1);

var p2 = Object.create(
  { z: 0 },
  {
    x: { value: 1, writable: false, enumerable: true, configurable: true },
    y: { value: 2, writable: false, enumerable: true, configurable: true }
  }
);
Object.seal(p2);

Object.getOwnPropertyDescriptor(p1, "x");
Object.getOwnPropertyDescriptor(p2, "x");

/**
 * prototype
 */

function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true

function testAdd() {
  return this.a + this.b;
}

console.log(testAdd.apply({ a: 1, b: 2 }, null));
console.log(testAdd.call({ a: 1, b: 2 }));

function testApply(a) {
  console.log("testApply:" + a);
}
testApply.apply({}, ["hah"]);
testApply.call({}, "hah");
Function.prototype.call.apply(
  function(a) {
    return a;
  },
  [0, 4, 3]
);
Function.prototype.call.apply(
  function(a) {
    return a;
  },
  [0, 4, 3]
);
Function.prototype.call();
