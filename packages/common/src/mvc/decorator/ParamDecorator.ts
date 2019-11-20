/// <reference path = "../../types/CommonTypes.ts" /> 
/// <reference path = "../../types/WebTypes.ts" /> 
import { ParameterType } from "swagger2/src/schema";
import { SApiParameter } from "../../swagger/decorator";
import { SwaggerTypes } from "../../types/SwaggerTypes";
import {paramList} from '../'

export function createParamDecorator<T extends SwaggerTypes.IParamCfg>(inType: ParameterType) {

  return (iParamCfg: T): CommonTypes.GenericParameterDecorator<any> =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    {
      return (target: CommonTypes.Type<any>, name: any, index: number) => {
        paramList.push({ target, index, inType, name, ...iParamCfg });
        SApiParameter({inType,index,...iParamCfg})(target,name,{});
      };
    };
}

export const Query = createParamDecorator<SwaggerTypes.IParamCfgHasArray>("query");
export const Path = createParamDecorator<SwaggerTypes.IParamCfg>("path");
export const Body = createParamDecorator<SwaggerTypes.IParamCfgHasArray>("body");
export const Header = createParamDecorator<SwaggerTypes.IParamCfg>("header");
