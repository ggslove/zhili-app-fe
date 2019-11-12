interface RouteType {
  target: object;
  type: HttpMethod;
  name: string;
  path: string;
  func:any
}
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export const routeList: RouteType[] = [];
export function createMethodDecorator(method: HttpMethod = 'get') {
  return (path = '/'): MethodDecorator =>
    // target：当前类实例，name：当前函数名，descriptor：当前属性（函数）的描述符
    <T>(target: object, name: any, descriptor: TypedPropertyDescriptor<T>) => {
      routeList.push({ type: method, target, name, path, func: descriptor.value });
    };
}
// 使用
export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
export const Patch = createMethodDecorator('patch');
