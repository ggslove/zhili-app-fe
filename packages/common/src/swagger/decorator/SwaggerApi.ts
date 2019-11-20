/// <reference path = "../../types/CommonTypes.ts" /> 
/// <reference path = "../../types/WebTypes.ts" /> 
import { SwaggerTypes } from "../../types/SwaggerTypes";
import {swaggerApiList,swaggerParameterCfgList,swaggerApiResultList} from '../'


const createSwaggerApiDeccorator = <T>(key: keyof SwaggerTypes.SwaggerApiCfg) => (
  value: T
): CommonTypes.GenericMethodDecorator<any> => (
  target: CommonTypes.Type<any>,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const apis = swaggerApiList.filter(
    it => it.name === name && it.target === target
  );
  if (apis.length > 1) {
    throw new Error(` ${target.name} 类中 有多个 ${name} 配置`);
  }
    //非 parameter时
  if (apis.length == 1) {
    Object.assign(apis[0], { [key]: value });
  } else {
    swaggerApiList.push({ target, name, [key]: value });
  }
};

export const SApiPath = createSwaggerApiDeccorator<string>("path");
export const SApiTags = createSwaggerApiDeccorator<Array<string>>("tags");
export const SApiSummary = createSwaggerApiDeccorator<string>("summary");
export const SApiHttpMethod = createSwaggerApiDeccorator<WebTypes.HttpMethod>(
  "httpMethod"
);

// export const SApiDescription = createSwaggerApiDeccorator<string>(
//   "description"
// );
//=> 用来转换为 parameter
export const SApiParameter = (cfg:SwaggerTypes.ISwaggerParameterCfg
): CommonTypes.GenericMethodDecorator<any> => (
  target: any,name: any,descriptor: TypedPropertyDescriptor<any>
) => {
  swaggerParameterCfgList.push({
    target,
    name,
    ...cfg
  });
};

// export const SApiParameters = (
//   cfgs: Array< IParamCfg>
// ): GenericMethodDecorator<any> => (
//   target: any,
//   name: any,
//   descriptor: TypedPropertyDescriptor<any>
// ) => {
//   cfgs.map(cfg => {
//     swaggerParameterCfgList.push({ target, name, ...cfg });
//   });
// };



//分页结果
export const SApiResult=(cfgs:Array<SwaggerTypes.IResultCfg>): CommonTypes.GenericMethodDecorator<any> => (
  target: any,
  name: any,
  descriptor: TypedPropertyDescriptor<any>
) => {
  cfgs.map(cfg=>{
    swaggerApiResultList.push({target,name,...cfg});
  })
}
