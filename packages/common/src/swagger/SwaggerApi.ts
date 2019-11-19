import {
  Document,
  Parameter,
  Operation,
  DataType,
  DataFormat
  ,ParameterType
} from "swagger2/src/schema";
import {
  Type,
  GenericClassDecorator,
  GenericMethodDecorator,
  GenericPropertyDecorator
} from "../decorator";

import  HttpStatus from '../util/HttpStatus'

import { HttpMethod } from "../mvc/decorator";

interface SwaggerApiCfg extends Operation {
  target: Type<any>; //类对象
  name: string; //方法名 必填
  path?: string; //必填  这个path 需要 controller 的path
  httpMethod?: HttpMethod; //必填
}

// tags?: Array<string>; //默认 ["defalut"]
// summary?: string; //默认""
// description?: string;
// produces?: Array<ContentType>;
// httpMethod?: HttpMethod; //必填
// parameters?: Parameter[]; //必有值
// responses?: any; //必须填
// in?: ParameterType; // 根据方法的@Query,@Body,@Head 等参数去获取

interface SwaggerApiParamCfg {
  target: Type<any>; //具体类
  name: string; //方法名 必填

  [key: string]: any;
}

export const swaggerApiList: Array<SwaggerApiCfg> = [];
export const swaggerApiParamCfgList: Array<SwaggerApiParamCfg> = [];
export const swagggerApiResCfgList:Array<any>=[];

export const swaggerApiResultList:Array<SwaggerApiResult>=[];


const createSwaggerApiDeccorator = <T>(key: keyof SwaggerApiCfg) => (
  value: T
): GenericMethodDecorator<any> => (
  target: Type<any>,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const apis = swaggerApiList.filter(
    it => it.name === name && it.target === target
  );
  if (apis.length > 1) {
    throw new Error(` ${target.name} 类中 有多个 ${name} 配置`);
  }
  if (key === "parameters") {
    if (!apis[0].parameters) {
      apis[0].parameters = [];
    }
    apis[0].parameters.push(value);
  } else {
    //非 parameter时
    if (apis.length == 1) {
      Object.assign(apis[0], { [key]: value });
    } else {
      //TODO:这里可加入默认错误http code
      swaggerApiList.push({ target, name, [key]: value, responses: {} });
    }
  }
};

export const SApiPath = createSwaggerApiDeccorator<string>("path");
export const SApiTags = createSwaggerApiDeccorator<Array<string>>("tags");
export const SApiSummary = createSwaggerApiDeccorator<string>("summary");
export const SApiDescription = createSwaggerApiDeccorator<string>(
  "description"
);
export const SApiHttpMethod = createSwaggerApiDeccorator<HttpMethod>(
  "httpMethod"
);

//=> 用来转换为 parameter

import {IParamCfg} from '../mvc/decorator';
export const SApiParameter = (cfg:IParamCfg
): GenericMethodDecorator<any> => (
  target: any,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  swaggerApiParamCfgList.push({
    target,
    name,
    ...cfg
  });
};

export const SApiParameters = (
  cfgs: Array< IParamCfg>
): GenericMethodDecorator<any> => (
  target: any,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  cfgs.map(cfg => {
    swaggerApiParamCfgList.push({ target, name, ...cfg });
  });
};

export interface IResponseData<T>{
  data?: T|undefined;  
  description?: string | undefined;
  code: HttpStatus;
}


interface SwaggerApiResult{
  target:Type<any>;

  [key:string]:any; //如果存在pageNum的 则为 分页对象
}


//分页结果
export const SApiResult=(reponseDatas:Array<IResponseData<any>>): GenericMethodDecorator<any> => (
  target: any,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  reponseDatas.map(responseData=>{
    swaggerApiResultList.push({target,...responseData});
  })
}
