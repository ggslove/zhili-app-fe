import 'reflect-metadata';
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


interface PathParam{
  name?:string;
  type?:string;
  required?:boolean
}

function Path(param:PathParam):ParameterDecorator{
  return (target:Object,propertyKey:Symbol|string, index:number)=>{
    console.log(target)
    console.log(Reflect.getMetadata("design:paramtypes",target))
    //反射获取具体的累
  }
}

// body
function Body(param:PathParam):ParameterDecorator{
  return (target:Object,propertyKey:Symbol|string, index:number)=>{
    console.log(propertyKey)
    console.log(Reflect.getMetadata("design:paramtypes",target,))
    //反射获取具体的类
  }
}


function logParamTypes(target : any, key : string) {
  console.log(`------ key is ${key}`)
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  //@ts-ignore
  var s = types.map(a => a.name).join();
  console.log(types[2])
  console.log(`${key} param types: ${s}`);
} 
class Controller{
  constructor(public abc:string="aahah"){
  }
  findUser(@Path({name:"username",type:"string",required:true}) username:string){
  }
  saveUser(@Body({name:"username",type:"string",required:true}) user:{name?:string}){
  }

  @logParamTypes // apply parameter decorator
  doSomething(
    param1: string,
    param2: number,
    param3: PathParam,
    param4: { test: string },
    param6: Function,
    param7: (a: number) => void
  ): number {
    return 1;
  }
}

