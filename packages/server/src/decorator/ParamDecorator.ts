export interface ParamType {
  name: string;
  key?: string;
  index: number;
  type: Param;
}
export type Param = "params" | "query" | "body" | "headers" | "cookies";
export const paramList: ParamType[] = [];
export function createParamDecorator(type: Param) {
  return (key?: string): ParameterDecorator =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    (target: object, name: any, index: number) => {
      paramList.push({ key, index, type, name });
    };
}
// 使用
export const Query = createParamDecorator("query");
export const Body = createParamDecorator("body");
export const Headers = createParamDecorator("headers");
