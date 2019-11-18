import {GenericMethodDecorator,Type} from '../../decorator';
import {SApiHttpMethod,SApiPath} from '../../swagger/';
import {path2Swagger} from '../../util/pathUtil';
interface RouteType {
  target: Type<any>;
  type: HttpMethod;
  name: string;
  path: string;
  func: any;
}
export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
export const routeList: RouteType[] = [];
export function createMethodDecorator(type: HttpMethod = "get") {
  return (path = "/"): GenericMethodDecorator<any> =>
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
      SApiPath(path2Swagger(path))(target,name,descriptor);
      SApiHttpMethod(type)(target,name,descriptor);

      //TODO:返回参数responses

    };
}


export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");
export const Patch = createMethodDecorator("patch");
