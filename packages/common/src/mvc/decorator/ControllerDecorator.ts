/// <reference path = "../../types/CommonTypes.ts" /> 
import  {controllerList} from '../';
import {path2Swagger} from '../../util';
import {SApiController} from '../../swagger/decorator';
export function Controller(path:string):CommonTypes.GenericClassDecorator<CommonTypes.Type<any>> {
  // target: controller 类，不是实例
  return (target: CommonTypes.Type<any>) => {
    const d={path: path2Swagger(path), target:target };
    controllerList.push(d);
    SApiController(d);
  };
}

