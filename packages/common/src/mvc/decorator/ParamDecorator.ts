/// <reference path = "../../types/CommonTypes.ts" /> 
/// <reference path = "../../types/WebTypes.ts" /> 
import { ParameterType } from "swagger2/src/schema";
import { SApiParameter } from "../../swagger/decorator";
import { SwaggerTypes } from "../../types/SwaggerTypes";
import {paramList} from '../'
import {logger} from '../../util';

export function createParamDecorator<T extends SwaggerTypes.IParamCfg>(inType: ParameterType) {

  return (iParamCfg: T): CommonTypes.GenericParameterDecorator<any> =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    {
      return (target: CommonTypes.Type<any>, name: any, index: number) => {
        if(iParamCfg.name){
          logger.warn(`${target.name}类${name}方法第${index}个参数的配置中存在name,这个不需要设置`)
        }
        paramList.push({ target, index, inType, ...iParamCfg,name});
        SApiParameter({inType,index,...iParamCfg})(target,name,{});
      };
    };
}

export const Query = createParamDecorator<SwaggerTypes.IParamCfgHasArray>("query");
export const Path = createParamDecorator<SwaggerTypes.IParamCfg>("path");
export const Body = createParamDecorator<SwaggerTypes.IParamCfgHasArray>("body");
export const Header = createParamDecorator<SwaggerTypes.IParamCfg>("header");
