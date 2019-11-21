import { ParameterType, DataFormat, DataType } from "swagger2/src/schema";
import HttpStatus from "./HttpStatus";

export namespace SwaggerTypes {
 
  export interface SwaggerControllerCfg{
    target: CommonTypes.Type<any>; //类对象
    name:string;
    description:string;
    path:string;
  }

  export interface SwaggerTagInfo{
    name:string;
    description:string;
    
    [extendKey:string]:any;
  }
  export interface SwaggerApiCfg {
    target: CommonTypes.Type<any>; //类对象
    name: string; //方法名 必填
    path?: string; //必填  这个path 需要 controller 的path
    httpMethod?: WebTypes.HttpMethod; //必填
    tags?: Array<string>;
    produces?: Array<string>;
    summary?: string;
    description?: string;
  }

  export interface ISwaggerParameterCfg {
    key: string; //关键字，query的name
    inType: ParameterType; //'query' | 'path' | 'body' | 'header' | 'formData'; 等类型
    parse: ParseType;
    isArray?: boolean;
    description?: string;
    required?: boolean;
    format?: DataFormat;
    collectionFormat?: any;
    ref?: CommonTypes.Type<any>;
    index: number;

    [key: string]: any;
  }
  export interface SwaggerParameterCfg extends ISwaggerParameterCfg {
    target: CommonTypes.Type<any>; //具体类
    name: string; //方法名
  }

  export type ResultType = "string" | "object" | "array" | "pagination";

  export interface IResultCfg {
    type: ResultType;
    ref?: CommonTypes.Type<any>;
    code: HttpStatus;
    description?: string;
  }

  export interface SwaggerApiResultCfg extends IResultCfg {
    target: CommonTypes.Type<any>;
    name: string; //方法名
  }

  //--------------SwaggerClass---------------------

  export type SwaggerClassType = "object";

  export interface SwaggerCfgClass {
    target: CommonTypes.Type<any>;
    type: SwaggerClassType;
    required?: Array<string>;
    className: string;
    properties?: { [key: string]: SwaggerFieldProp }; //需要校验
  }

  export type FieldDataType = DataType | "object";

  export interface SwaggerFieldProp {
    type: FieldDataType;
    format?: DataFormat;
    description?: string;
    example?: any;
    items?: Array<any>;
    enum?: Array<any>;
    required?: boolean;
    ref?: CommonTypes.Type<any>;
  }

  export interface SwaggerFieldCfg extends SwaggerFieldProp {
    target: CommonTypes.Type<any>;
    name: string; //字段名称
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

  export type ParseType = "object" | "string" | "integer"| "boolean"; //基本类型｜数组｜对象

  export interface IParamCfg {
    key: string; //关键字，query的name
    parse: ParseType;
    description?: string;
    required?: boolean;
    format?: DataFormat;
    collectionFormat?: any;
    ref?: CommonTypes.Type<any>;

    [key: string]: any;
  }

  export interface IParamCfgHasArray extends IParamCfg {
    isArray: boolean;
  }

  export interface ParamConfig extends IParamCfg {
    target?: CommonTypes.Type<any>;
    name?: string; //方法名
    inType: ParameterType; //path,query,等等
    index: number;
  }
}
