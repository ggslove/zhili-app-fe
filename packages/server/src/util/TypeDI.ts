
import 'reflect-metadata';
//emitDecoratorMetadata 为true 才可以 有refelect.getMetadata属性
const Service = () : ClassDecorator => {
  return target => {
    console.log(Reflect.getMetadata('design:paramtypes', target));
    console.log("--------")
  };
};

class Bar {}

@Service()
class Foo {
  constructor(bar: Bar, baz: string) {}
}

console.log(Foo.prototype)