import "reflect-metadata";
//  编写 swagger api文档
// 搭建 针对 swagger的mocker server  mocker server 加入
// 后台编写代码
// import {Paths} from 'swagger2/dist/schema';
//  swagger  ParameterType 类型
//  ParameterType = 'query' | 'path' | 'body' | 'header' | 'formData';

/**
 *  @Get("/users/${username}?{area}")
 *  findUsername(@Path({name:username",type:"string",required:true}) username:string,
 *               @Query({name:"area",required:true,type:"string")area:string)
 *  :Pagination<User>{
 *    return ...
 *  }
 *  @Post("/users")
 *  saveUser(@Body("ref")user:User){
 *    return ...
 *  }
 *
 */
import { Definition } from "swagger2/src/schema";

interface PathParam {
  name?: string;
  type?: string;
  required?: boolean;
}

// function Path(param:PathParam):ParameterDecorator{
//   return (target:Object,propertyKey:Symbol|string, index:number)=>{
//     console.log(target)
//     console.log(Reflect.getMetadata("design:paramtypes",target))
//     //反射获取具体的类
//   }
// }

function Service(): ClassDecorator {
  return (target: object) => {
    const obj = Reflect.getMetadata("design:paramtypes", target);
    console.log(obj);
  };
}

function SwaggerSchema(): ClassDecorator {
  return (target: object) => {
    console.log(target);
    /*
[[FunctionLocation]]:internal#location
[[Scopes]]:Scopes[2]
arguments:TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
caller:TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
length:0
name:"DtoBean"
prototype:Object {constructor: }
constructor:class DtoBean { … }
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
__proto__:function () { … }
*/
    const params = Reflect.getMetadata("design:paramtypes", target);
    console.log("---------params is-------")
    console.log(params);
    console.log("----------------")
  };
}



function logParamTypes(target: any, key: string) {
  console.log(`------ key is ${key} --------`);
  const results = Reflect.getMetadata("design:returntype", target, key);
  console.log(results.name);
  
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  //@ts-ignore
  var s = types.map(a => a.name).join();
  console.log(types[2]);
  console.log(`${key} param types: ${s}`);
}


function queryParam():ParameterDecorator{
  return (target: object, name: any, index: number) => {
    console.log(target)
  };
}

@SwaggerSchema()
class DtoBean {
  private name:string;

  public query(@queryParam() name:String){
    
  }

}

// @Service()
// class Controller {
//   constructor(public abc: DtoBean = new DtoBean()) {}

//   @logParamTypes // apply parameter decorator
//   doSomething(
//     @queryParam() param1: string,
//     param2: number,
//     param3: PathParam,
//     param4: { test: string },
//     param6: Function,
//     param7: (a: number) => void,
//     param8:DtoBean
//   ): DtoBean {
//     return new DtoBean();
//   }
// }

// type Constructor<T = any> = new (...args: any[]) => T;

// const Factory = <T>(target: Constructor<T>): T  => {
//   // 获取所有注入的服务
//   const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
//   const args = providers.map((provider: Constructor) => new provider());
//   return new target(...args);
// }


// Factory(Controller).testMethod()  