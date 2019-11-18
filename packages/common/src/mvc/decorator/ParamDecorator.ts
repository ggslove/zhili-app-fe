import { GenericParameterDecorator, Type } from "../../decorator";
import { ParameterType } from "swagger2/src/schema";
import {SApiParameter} from '../../swagger/';
export interface ParamConfig {
  target: Type<any>;
  name: string; //方法名
  key?: string; //关键字，query的name
  index: number;
  type: ParameterType;
  parse?: Parse;
}


// export type ParameterType = 'query' | 'path' | 'body' | 'header' | 'formData';
// export type ParamType = "path" | "query" | "body" | "headers" | "cookies";
export type Parse = "number" | "string" | "boolean" | "object" | undefined;
export const paramList: ParamConfig[] = [];

interface IParamCfg{
  key?:string|undefined;
  bodyType?:Type<any>;
  parse:Parse;
  required?:boolean;
}

/*
  $ref?: string;
  type?: DataType;
  format?: DataFormat;
  schema?: any;
  required?: boolean;
  items?: any;
  collectionFormat?: string;
  */

export function createParamDecorator(type:ParameterType) {
  return (iParamCfg:IParamCfg): GenericParameterDecorator<any> =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    {
      return (target: Type<any>, name: any, index: number) => {
        paramList.push({ target, index, type, name ,...iParamCfg});
        //TODO swagger 传入参数配置
        SApiParameter({
            in:type,
            name:iParamCfg.key,
            required:iParamCfg.required,
            // $ref: 
            // format:
            // items:
            // collectionFormat
        });
      };
    };
}

export const Query = createParamDecorator("query")
export const Path = createParamDecorator("path");
export const Body = createParamDecorator("body");
export const Header = createParamDecorator("header");
