import { GenericParameterDecorator, Type } from "../../decorator";
import { ParameterType,DataFormat } from "swagger2/src/schema";
import { SApiParameter } from "../../swagger/";


/*
  $ref?: string;
  type?: DataType;
  format?: DataFormat;
  schema?: any;
  required?: boolean;
  items?: any;
  collectionFormat?: string;
  */
export interface IParamCfg{
  key: string; //关键字，query的name
  parse?: Parse;
  description?:string;
  required?: boolean;
  format?:DataFormat;
  items?:any;
  collectionFormat?:any;
  ref?:Type<any>;

  [key:string]:any
}
export interface ParamConfig  extends IParamCfg{
  target?: Type<any>;
  name?: string; //方法名
  type: ParameterType;
  index: number;
 
}

// export type ParameterType = 'query' | 'path' | 'body' | 'header' | 'formData';
// export type ParamType = "path" | "query" | "body" | "headers" | "cookies";
export type Parse = "number" | "string" | "boolean" | "object" | undefined;
export const paramList: ParamConfig[] = [];

export function createParamDecorator(type: ParameterType) {

  return (iParamCfg: IParamCfg): GenericParameterDecorator<any> =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    {
      return (target: Type<any>, name: any, index: number) => {
        paramList.push({ target, index, type, name, ...iParamCfg });
        //加入 api Param 模块
        SApiParameter(iParamCfg)(target,name,{});
      };
    };
}

export const Query = createParamDecorator("query");
export const Path = createParamDecorator("path");
export const Body = createParamDecorator("body");
export const Header = createParamDecorator("header");
