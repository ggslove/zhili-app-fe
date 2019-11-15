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
import {Definition} from 'swagger2/src/schema';

interface PathParam{
  name?:string;
  type?:string;
  required?:boolean
}

function Path(param:PathParam):ParameterDecorator{
  return (target:Object,propertyKey:Symbol|string, index:number)=>{
    console.log(target)
    console.log(Reflect.getMetadata("design:paramtypes",target))
    //反射获取具体的类
  }
}

function Body(param:PathParam):ParameterDecorator{
  return (target:Object,propertyKey:Symbol|string, index:number)=>{
    console.log(propertyKey)
    const obj=Reflect.getMetadata("design:paramtypes",target,);
    console.log(obj)
    //反射获取具体的类
  }
}

function Service():ClassDecorator{
  return (target: object)=>{
    const obj=Reflect.getMetadata("design:paramtypes",target,);
    console.log(obj)
  }
}


//PropertyDecorator，ParameterDecorator 都获取不了具体的 属性类型，
function propTest():PropertyDecorator{
  return (target: Object, key: string | symbol)=>{
    var t = Reflect.getMetadata("design:type", target, key);
    console.log("----------propTest---------------")
    console.log(`${key?key.toString():""} type: ${t.name}`);
    console.log("----------propTest END---------------")
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

@Service()
class Controller{
 @propTest()
  private ppp:PathParam={};
  constructor(public abc:string="aahah"){
  }
  findUser(@Path({name:"username",type:"string",required:true}) username:string){
    console.log(this.ppp);
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
