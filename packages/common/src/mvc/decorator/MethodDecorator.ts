/// <reference path = "../../types/CommonTypes.ts" /> 
/// <reference path = "../../types/WebTypes.ts" /> 
import { SApiHttpMethod, SApiPath } from "../../swagger/decorator";
import { routeList } from '../'

export function createMethodDecorator(type: WebTypes.HttpMethod = "get") {
  return (path = "/"): CommonTypes.GenericMethodDecorator<any> =>
    // target：当前类实例，name：当前函数名，descriptor：当前属性（函数）的描述符
    (target: any, name: any, descriptor: TypedPropertyDescriptor<any>) => {
      routeList.push({
        target,
        type,
        name,
        path,
        func: descriptor.value
      });
      //加入 Swagger的 HttpMethod 内容
      SApiPath(path)(target, name, descriptor);
      SApiHttpMethod(type)(target, name, descriptor);
    };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");
export const Patch = createMethodDecorator("patch");
