import 'reflect-metadata';

// function singleton<T extends { new() }>(constructor: T): T {
//   return new constructor()
// }

// @singleton
// export default class SomeClass {
//   constructor() {}

//   public method(): string {
//       return 'Hello!'
//   }
// }

// console.log(SomeClass.method())

// function singleton<T>(constructor: new () => T): T {
//   return new constructor()
// }

// export const SomeClass = singleton(class {
//   constructor() { }

//   public method(): string {
//     return 'Hello!'
//   }
// });

// console.log(SomeClass.method())


// class Foo {
// }

// class Bar {
//   constructor(foo: Foo) {
//   }
// }

// class Foobar {
//   constructor(foo: Foo, bar: Bar) {
//   }
// }


// const foobar = new Foobar(new Foo(), new Bar(new Foo()));

// const foobar2 = Injector.resolve<Foobar>(Foobar);


interface Type<T> {
  new(...args: any[]): T;
}
// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

type GenericClassDecorator<T> = (target: T) => void;


const Service = () : GenericClassDecorator<Type<object>> => {
  return (target: Type<object>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};

const Injector = new class {
  /**
   * Resolves instances by injecting required services
   * @param {Type<any>} target
   * @returns {T}
   */
  resolve<T>(target: Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
      injections = tokens.map(token => Injector.resolve<any>(token));

    return new target(...injections);
  }
};


// @Service()
class Foo {
  doFooStuff() {
    console.log('foo');
  }
}
// @Service()
class Bar {
  constructor(public foo: Foo) {
  }

  doBarStuff() {
    console.log('bar');
  }
}
@Service()
class Foobar {
  constructor(public foo: Foo, public bar: Bar) {
  }
}

console.log(Reflect.getMetadata('design:paramtypes', Foobar))

const foobar = Injector.resolve<Foobar>(Foobar);

console.log(foobar.bar)
// foobar.bar.doBarStuff();
// foobar.foo.doFooStuff();
// foobar.bar.foo.doFooStuff();

// const Service = (): ClassDecorator => {
//   return target => {
//     // console.log(`target is ${target} `)
//     console.log( target == Foo.prototype.constructor)
//     // console.log(Reflect.getMetadata('design:paramtypes', target))
//     // console.log(target)
//     Reflect.defineMetadata("hello",Object.create(target.prototype),target);
//   };
// };
//
// class Bar { }
// @Service()
// class Foo {
//   constructor(bar: Bar, baz: string) { }

//   test(){
//     return "aaa";
//     //console.log("111");
//   }
// }

// console.log(

// Reflect.getMetadata("hello",Foo.prototype.constructor).test()
// );

// @Reflect.metadata('name', 'A')
// class A {
//   // metakey, value, 然后在一个注释的方法
//   @Reflect.metadata('hello', 'world')
//   // @Reflect.metadata('heihei2', 'world2')
//   public hello(): string {
//     return 'hello world'
//   }
// }
// const objs = [A, new A, A.prototype]

// const res = objs.map(obj => [
//   Reflect.getMetadata('name', obj),
//   Reflect.getMetadata('name', obj, 'hello'),
//   Reflect.getOwnMetadata('name', obj),
//   Reflect.getOwnMetadata('name', obj, 'hello')
// ])
// // A,undefined,undefined,undefind
// //undefined, world,

// console.log(res)

// // console.log(Reflect.getMetadata('name', A)) // 'A'
// // console.log(Reflect.getMetadata('heihei', new A(),"hello")) // metadataKey, 对象，绑定的方法
// // console.log(Reflect.getMetadata('heihei2', new A(),"hello")) // 'world'
// // console.log(new A());
// // console.log("-------");

// class Example {
//     // property declarations are not part of ES6, though they are valid in TypeScript:
//     // static staticProperty;
//     // property;
//     constructor(p:any) { }
//     static staticMethod(p:any) { }
//     method(p:any) { }
// }
// // constructor
// let  result = Reflect.hasMetadata("custom:annotation", Example);
// console.log("1:"+result)
// // property (on constructor)
// result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
// console.log("2:"+result)
// // property (on prototype)
// result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
// console.log("3:"+result)
// // method (on constructor)
// result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
// console.log("4:"+result)
// // method (on prototype)
// result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
// console.log("5:"+result)