/// <reference path = "../../types/CommonTypes.ts" /> 
import  {controllerList} from '../';
import {path2Swagger} from '../../util';
import {SApiController} from '../../swagger/decorator';
export function Controller(path:string,description?:string):CommonTypes.GenericClassDecorator<CommonTypes.Type<any>> {
  // target: controller 类，不是实例
  return (target: CommonTypes.Type<any>) => {
    const d={
      path: path2Swagger(path), 
      description: description?description:target.prototype.name,
      target,
      name:target.name.replace(/controller/gi,"").toLowerCase()
    };
    controllerList.push(d);
    SApiController(d);
  };
}

